import cv2
import threading
import base64
import time
import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect , HTTPException
# from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from ultralytics import YOLO
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from datetime import datetime, timezone

# Constants
INPUT_VIDEO_FOLDER = "videos"  # folder with input videos
VID_STRIDE = 3
CONFIDENCE_THRESHOLD = 0.5

# PPE classes mapping from YOLO
PPE_CLASSES = {
    0: "Hardhat",
    5: "Person",
    7: "SafetyVest",
    11: "down"
}


REQUIRED_EQUIPMENT = {
    "Hardhat": True,
    "SafetyVest": True,
    "Person": True,
    "down": False  # Only becomes anomaly when present (fall detected)
}
from pymongo import MongoClient
client = MongoClient("mongodb+srv://Zamin2:gApHkOeeOGY14ML5@cluster0.8cadg.mongodb.net/")  # Adjust your URI
db = client["test"]
collection_sites = db["sites"]
# collection_detection = db["anomaly_details"]
# collection_alerts = db["Alerts"]
collection_alerts = db["detectedanomalies2"]
incidents_collection = db["anomalyresponses2"]
incidents_collection = db["Incident_info"]

def log_anomaly(video_name, violation_type, timestamp):
    site_doc = collection_sites.find_one({"SiteName": video_name})
    if not site_doc:
        print(f"⚠ [WARNING] No matching site found for video: {video_name}")
        return

    site_id = site_doc["_id"]
    alert = {
        "siteId": site_id,
        "description": violation_type,
        "detectedAt": timestamp
    }
    anomaly_id = collection_alerts.insert_one(alert).inserted_id
    print(f"✅ Logged in DB: {anomaly_id}")
    return anomaly_id


def create_incident(anomaly_id):
    incident_record = {
        "anomalyId": anomaly_id,
        "responseTime": None,
        "responseDetails": None,
        "status": "Unresolved",
        "resolvedAt": None
    }
    incidents_collection.insert_one(incident_record)
    print(f"📌 Incident Created (Unresolved)")

# FastAPI app setup
app = FastAPI()


# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket connection manager keyed by sitename (video filename without extension)
class ConnectionManager:
    def _init_(self):
        self.active_connections = {}  # sitename (str) -> websocket

    async def connect(self, websocket: WebSocket, sitename: str):
        await websocket.accept()
        self.active_connections[sitename] = websocket
        print(f"[WS] Client connected: {sitename}")

    def disconnect(self, sitename: str):
        if sitename in self.active_connections:
            del self.active_connections[sitename]
            print(f"[WS] Client disconnected: {sitename}")

    async def send_json(self, sitename: str, data: dict):
        if sitename in self.active_connections:
            try:
                await self.active_connections[sitename].send_json(data)
            except Exception as e:
                print(f"[WS] Error sending to {sitename}: {e}")
                self.disconnect(sitename)

manager = ConnectionManager()


# Threaded video processor for each video file
class VideoProcessor(threading.Thread):
    def __init__(self, video_path, model, sitename):
        threading.Thread.__init__(self, daemon=True)
        self.video_path = video_path
        self.model = model
        self.sitename = sitename
        self.running = False
        self.frame_queue = []
        self.lock = threading.Lock()
        self.last_check_time = 0
        self.check_interval = 10 

        

  

    
    def check_anomalies(self, detected_classes, timestamp, frame):
        class_counts = {item: detected_classes.count(item) for item in PPE_CLASSES.values()}
        person_count = class_counts.get("Person", 0)
        down_count = class_counts.get("down", 0)

    # Calculate missing PPE
        required_ppe_counts = {
        item: person_count if required else 0 
        for item, required in REQUIRED_EQUIPMENT.items() 
        if item != "Person"
    }
        missing_ppe = {
        item: required_count - class_counts.get(item, 0)
        for item, required_count in required_ppe_counts.items()
        if class_counts.get(item, 0) < required_count
    }
        print("🔴 Detected Classes:", class_counts)
        print("🔴 Classes detected now :",detected_classes)
        print(f"🔴 Total Persons: {person_count}")
        print(f"🔴 Total Falls: {down_count}")

        required_ppe_counts = {
        item: person_count if required else 0 
        for item, required in REQUIRED_EQUIPMENT.items() 
        if item != "Person"
    }
    
        print("🔴 Required PPE Counts:", required_ppe_counts)

        

    # Build alert description
        alert_parts = []
        if missing_ppe:
            alert_parts.append("Missing PPE - " + ", ".join(
            f"{item}: {count} missing" for item, count in missing_ppe.items()
        ))
        if down_count > 0:
            alert_parts.append(f"Fall Detected: {down_count} case(s)")

        if alert_parts:
            description = " | ".join(alert_parts)
            iso_timestamp = datetime.fromtimestamp(timestamp, tz=timezone.utc).isoformat()
        
        # Log anomaly to DB and get the alert_id
            alert_id = log_anomaly(self.sitename, description, iso_timestamp)
        
            if alert_id:

            
            # Save the frame as screenshot with alert_id as filename
                screenshot_path = f"anomaly_screenshots/{alert_id}.jpg"
                cv2.imwrite(screenshot_path, frame)
                print(f"📸 Saved anomaly screenshot: {screenshot_path}")
            
            # Create incident record
                create_incident(alert_id)
    
    

    def run(self):
        print(f"[Processor {self.sitename}] Starting for {self.video_path}")
        self.running = True
        cap = cv2.VideoCapture(self.video_path)
        try:
            while self.running:
                ret, frame = cap.read()
                if not ret:
                    print(f"[Processor {self.sitename}] End of video reached.")
                    break

                # Run YOLO prediction
                results = self.model.predict(
                    frame,
                    classes=list(PPE_CLASSES.keys()),
                    conf=CONFIDENCE_THRESHOLD,
                    vid_stride=VID_STRIDE
                )

                # Draw bounding boxes on the frame
                plotted_frame = results[0].plot()
                detected = self.extract_classes(results)

                # Check for anomalies at intervals (while continuing to stream)
                current_time = time.time()
                if current_time - self.last_check_time >= self.check_interval:
                    self.check_anomalies(detected, current_time, plotted_frame)
                    self.last_check_time = current_time

                # Encode and queue frame for WebSocket
                _, buffer = cv2.imencode(".jpg", plotted_frame)
                frame_b64 = base64.b64encode(buffer).decode()

                with self.lock:
                    self.frame_queue = [{
                        "frame": frame_b64,
                        "timestamp": current_time
                    }]

                time.sleep(0.05)  # Control frame rate
        finally:
            cap.release()

    def extract_classes(self, results):
        detected = []
        for r in results:
            for box in r.boxes:
                class_id = int(box.cls)
                if class_id in PPE_CLASSES:
                    detected.append(PPE_CLASSES[class_id])
        return detected


    def find_missing_equipment(self, detected):
        return [item for item, required in REQUIRED_EQUIPMENT.items()
                if required and item not in detected]

    def get_frame(self):
        with self.lock:
            if self.frame_queue:
                return self.frame_queue.pop(0)
        return None

# Global dictionary of site processors keyed by sitename
video_processors = {}

@app.on_event("startup")
async def startup_event():
    print("[Startup] Loading YOLO model and starting video processors...")
    # model = YOLO("D:/Yolov8 2/runs/detect/train/weights/best.pt")
    model = YOLO("D:/8th semester FYP/yolo2/best.pt")

    SCREENSHOT_DIR = "anomaly_screenshots"
    os.makedirs(SCREENSHOT_DIR, exist_ok=True)
    print(f"[Startup] Screenshot directory: {SCREENSHOT_DIR}")

    # Scan input folder and get all video files
    if not os.path.isdir(INPUT_VIDEO_FOLDER):
        print(f"[Startup] Input folder '{INPUT_VIDEO_FOLDER}' NOT found - creating it")
        os.makedirs(INPUT_VIDEO_FOLDER)

    video_files = []
    for filename in os.listdir(INPUT_VIDEO_FOLDER):
        if filename.lower().endswith((".mp4", ".avi", ".mov", ".mkv")):
            video_files.append(os.path.join(INPUT_VIDEO_FOLDER, filename))

    if not video_files:
        print(f"[Startup] No video files found in '{INPUT_VIDEO_FOLDER}'. Please add videos and restart.")
        return

    # Start one VideoProcessor thread per video
    for video_path in video_files:
        sitename = os.path.splitext(os.path.basename(video_path))[0]
        vp = VideoProcessor(video_path, model, sitename)
        video_processors[sitename] = vp
        vp.start()
        print(f"[Startup] Started processor for site '{sitename}'")

@app.on_event("shutdown")
async def shutdown_event():
    print("[Shutdown] Stopping all video processors...")
    for vp in video_processors.values():
        vp.running = False
        vp.join()
    print("[Shutdown] All video processors stopped.")

# WebSocket endpoint using sitename (video filename without extension) as identifier
@app.websocket("/ws/{sitename}")
async def websocket_endpoint(websocket: WebSocket, sitename: str):
    await manager.connect(websocket, sitename)
    try:
        while True:
            processor = video_processors.get(sitename)
            if processor:
                frame_data = processor.get_frame()
                if frame_data:
                    # Send current frame data with sitename
                    await manager.send_json(sitename, {
                        **frame_data,
                        "sitename": sitename
                    })
            await asyncio.sleep(0.01)  # prevent event loop blocking
    except WebSocketDisconnect:
        manager.disconnect(sitename)
        print(f"[WS] Client {sitename} disconnected")

from fastapi.responses import FileResponse
IMAGE_DIR = "anomaly_screenshots" 
@app.get("/alert-image/{anomaly_id}")
async def get_alert_image(anomaly_id: str):
    image_path = os.path.join(IMAGE_DIR, f"{anomaly_id}") 
    print(image_path) # Assuming images are .jpg
    if os.path.exists(image_path):
        return FileResponse(image_path)
    raise HTTPException(status_code=404, detail="Image not found")

# No default HTML UI as user stated React UI will be used

# Importing other API endpoints if needed, unchanged
# from reportdata2 import generate_report_data, reportusingLLM

# @app.get("/getreportdata")
# def get_detection():
#     return generate_report_data()

# @app.get("/getreportbyLLM")
# def get_detection():
#     return reportusingLLM()


# from typing import List
# from forecast2 import SafetyAnalyticsEngine  # Import your class
# from forecast import SafetyAnalyticsEngine  # Import your class
# import json

# @app.get("/prediction", response_model=List[dict])
# async def get_safety_analytics():
#     try:
#         analytics = SafetyAnalyticsEngine()
#         results = analytics.analyze_all_sites()
        
#         # Convert to your desired format
#         formatted_results = []
#         for result in results:
#             formatted = {
#                 "SiteID": result["SiteID"],
#                 "SiteName": result["SiteName"],
#                 "PredictedRiskLevel": result["PredictedRiskLevel"],
#                 "WeatherCondition": result["WeatherCondition"],
#                 "WeatherSeverity": result["WeatherSeverity"],
#                 "TotalAnomalies30Days": result["TotalAnomalies30Days"],
#                 "RecentAnomalies7Days": result["RecentAnomalies7Days"],
#                 "AnomalyBreakdown": result["AnomalyBreakdown"],
#                 "DailyAnomalyPattern": result["DailyAnomalyPattern"],
#                 "Recommendations": {
#                     "training_needs": result["Recommendations"]["training_needs"],
#                     "operational_changes": result["Recommendations"]["operational_changes"],
#                     "weather_actions": result["Recommendations"]["weather_actions"],
#                     "priority": result["Recommendations"]["priority"]
#                 }
#             }
#             formatted_results.append(formatted)
        
#         return formatted_results
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    

# from fastapi import FastAPI, UploadFile, File
# from create_emebd import create_embeddings  
# @app.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     os.makedirs("./temp", exist_ok=True)  # Ensure temp dir exists
#     contents = await file.read()
#     file_path = f"./temp/{file.filename}"

#     with open(file_path, "wb") as f:
#         f.write(contents)

#     success = create_embeddings(file_path)
#     return {"message": "Embeddings created successfully!" if success else "Failed to process file."}
    
# from chatbot import get_safety_response 
# from pydantic import BaseModel

# class QueryRequest(BaseModel):
#     query: str

# @app.post("/get-safety-response")
# async def get_safety_result(request: QueryRequest):
#     result = get_safety_response(request.query)
    
#     if "error" in result:
#         raise HTTPException(status_code=400, detail=result["error"])
    
#     return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


import motor.motor_asyncio
from bson import ObjectId
# import pymongo
# from datetime import datetime
from sklearn.cluster import KMeans
import numpy as np



# MONGO_URI="mongodb+srv://Zamin2:gApHkOeeOGY14ML5@cluster0.8cadg.mongodb.net/"
# client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
# db = client["test"]
# alerts_collection = db["detectedanomalies2"]
# sites_collection = db["sites"]

# SENSITIVITY_WEIGHTS = {
#     "Low": 1,
#     "Medium": 2,
#     "High": 3
# }

# async def fetch_alerts():
#     """Fetch alerts and corresponding site data"""
#     alerts = await collection_alerts.find().to_list(None)
#     site_ids = {alert["siteId"] for alert in alerts}
    
#     # Fetch site data for the alerts
#     sites = await sites_collection.find({"_id": {"$in": list(site_ids)}}).to_list(None)
#     site_map = {str(site["_id"]): site for site in sites}
    
#     return alerts, site_map

# def extract_features(alerts, site_map):
#     """Convert alerts into numerical features for clustering"""
#     feature_data = []
#     alert_map = {}

#     for alert in alerts:
#         alert_id = str(alert["_id"])
#         description = alert["description"]
#         detected_at = alert["detectedAt"]
#         site_id = str(alert["siteId"])

#         # Extract missing PPE count from description
#         missing_ppe_count = description.lower().count("missing")

#         # Convert timestamp to numerical value (seconds from epoch)
#         from datetime import datetime, timezone

# # Assume detected_at is a timezone-aware datetime
#         detected_at = datetime.now(timezone.utc)  # Example timestamp

# # Calculate time difference in seconds
#         time_score = (datetime.now(timezone.utc) - detected_at).total_seconds()

#         # Get site sensitivity weight
#         site = site_map.get(site_id, {})
#         sensitivity = site.get("Sensitivity", "Low")
#         sensitivity_weight = SENSITIVITY_WEIGHTS.get(sensitivity, 1)

#         # Feature Vector: [time_score, missing_ppe_count, sensitivity_weight]
#         feature_data.append([time_score, missing_ppe_count, sensitivity_weight])
#         alert_map[alert_id] = alert

#     return np.array(feature_data), alert_map

# def cluster_alerts(features, alert_map, n_clusters=3):
#     """Apply K-Means clustering for alert prioritization"""
#     if len(features) < n_clusters:
#         n_clusters = len(features)  # Ensure valid clustering

#     kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
#     labels = kmeans.fit_predict(features)

#     # Assign priority labels to alerts
#     priority_map = {}
#     for idx, alert_id in enumerate(alert_map.keys()):
#         priority_map[alert_id] = labels[idx]

#     return priority_map

# async def get_prioritized_alerts():
#     """Fetch, process, and return prioritized alerts"""
#     alerts, site_map = await fetch_alerts()
#     if not alerts:
#         return []

#     # Feature Extraction
#     features, alert_map = extract_features(alerts, site_map)

#     # Clustering for prioritization
#     priority_map = cluster_alerts(features, alert_map)

#     # Sort alerts by priority level (lower is higher priority)
#     sorted_alerts = sorted(alerts, key=lambda x: priority_map[str(x["_id"])])
    
#       # Populate site details for frontend usability
#     for alert in sorted_alerts:
#         site_id = str(alert["siteId"])
#         alert["siteId"] = site_map.get(site_id, {"_id": ObjectId(site_id), "siteName": "Unknown Site"})

#     return sorted_alerts

#     # return sorted_alerts

# from bson import ObjectId

# def serialize_mongo_document(doc):
#     """ Recursively convert MongoDB documents to a JSON serializable format. """
#     if isinstance(doc, dict):
#         return {key: serialize_mongo_document(value) for key, value in doc.items()}
#     elif isinstance(doc, list):
#         return [serialize_mongo_document(item) for item in doc]
#     elif isinstance(doc, ObjectId):
#         return str(doc)  # Convert ObjectId to string
    # return doc
