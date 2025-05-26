import os
import cv2
import torch
import pymongo
import multiprocessing
from collections import deque
from datetime import datetime
from pymongo import MongoClient
from ultralytics import YOLO

# Set paths
input_dir = "videos"  # Folder containing multiple videos
output_dir = "Output5"  # Folder to save processed videos
os.makedirs(output_dir, exist_ok=True)

# Load YOLO model
model = YOLO("D:/8th semester FYP/yolo2/best.pt")  # Your trained model path

# Database Connection
client = MongoClient("mongodb+srv://Zamin2:gApHkOeeOGY14ML5@cluster0.8cadg.mongodb.net/")
db = client["test"]
collection_sites = db["sites"]
collection_detection = db["anomaly_details"]
collection_alerts = db["detectedanomalies2"]

# Detection settings
CONFIDENCE_THRESHOLD = 0.5  # Adjust confidence as needed
SPECIFIC_CLASSES = [0, 1, 5, 6, 7]  # Class IDs to detect
BATCH_SIZE = 3  # Process multiple frames at once
ALERT_INTERVAL = 10  # Process alerts every 10 frames
alert_queue = deque(maxlen=50)  # To prevent duplicate alerts


def is_new_alert(violation):
    """Avoid duplicate alerts within a short timeframe."""
    if violation in alert_queue:
        return False
    alert_queue.append(violation)
    return True


def fetch_ppe_requirements(video_name):
    """Fetch PPE requirements and max persons from MongoDB based on siteId."""
    site_doc = collection_sites.find_one({"SiteName": video_name})
    if not site_doc:
        print(f"⚠ [WARNING] No matching site found ggkkhjhkjhljh for video: {video_name}")
        return
    
    site_id = site_doc["_id"]  # Extract siteId 
    detection_doc = collection_detection.find_one({"siteId": site_id})
    if not site_doc:
        print(f"⚠ [WARNING] No matching site found for video: {video_name}")
        return ["Hardhat", "Safety Vest"], 1  # Default PPE and max persons

    site_id = site_doc["_id"]

    # detection_doc = collection_detection.find_one({"siteId": site_id})
    # if not detection_doc:
    #     print(f"⚠ [WARNING] No detection settings found for siteId: {site_id}")
    #     return ["Hardhat", "Safety Vest"], 1  # Default PPE and max persons

    # # Extract required PPE items (only those marked as `true`)
    # REQUIRED_PPE = [
    #     ppe for ppe, is_required in detection_doc.items() 
    #     if is_required is True and ppe not in ["_id", "siteId", "max_persons"]
    # ]
    
    # MAX_PERSONS = detection_doc.get("max_persons", 1)  # Default to 1 if missing

    detection_doc = collection_detection.find_one({"siteId": site_id})
    if not detection_doc:
        print(f"⚠ [WARNING] No detection settings found for siteId: {site_id}")
        return ["Hardhat", "Safety Vest"], 1  # Default PPE and max persons

    # Step 3: Access the nested detectionRequirements object
    detection_requirements = detection_doc.get("detectionRequirements", {})

    # Extract required PPE items (only those marked as `true`)
    REQUIRED_PPE = [
        ppe for ppe, is_required in detection_requirements.items()
        if is_required is True
    ]

    # Get max persons from the parent document
    MAX_PERSONS = detection_requirements.get("max_persons", 1)

    print(f"✅ Site {site_id} ({video_name}): Required PPE: {REQUIRED_PPE}, Max Persons: {MAX_PERSONS}")
    return REQUIRED_PPE, MAX_PERSONS

    print(f"✅ Site {site_id} ({video_name}): Required PPE: {REQUIRED_PPE}, Max Persons: {MAX_PERSONS}")
    return REQUIRED_PPE, MAX_PERSONS


def save_alert_to_db(violation_type, video_name):
    """Store alerts in MongoDB with siteId and description."""
    timestamp = datetime.utcnow()

    # Fetch siteId by matching video_name
    site_doc = collection_sites.find_one({"SiteName": video_name})
    if not site_doc:
        print(f"⚠ [WARNING] No matching site found for video: {video_name}")
        return
    
    site_id = site_doc["_id"]  # Extract siteId

    # Prepare alert document
    alert = {
        "siteId": site_id,  
        "description": violation_type,  
        "detectedAt": timestamp
    }

    # Insert into alerts collection
    collection_alerts.insert_one(alert)
    print(f"⚠ [ALERT] {violation_type} detected at site {site_id} ({video_name})")


def process_video(video_path):
    """Process a video frame by frame with YOLOv8 and log alerts in MongoDB."""
    cap = cv2.VideoCapture(video_path)
    video_name = os.path.splitext(os.path.basename(video_path))[0]

    output_path = os.path.join(output_dir, video_name)
    print("these are my video names" , video_name)

    # Fetch PPE requirements for this site
    REQUIRED_PPE, MAX_PERSONS = fetch_ppe_requirements(video_name)

    # Get video properties
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # Video writer to save output
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    frames = []
    frame_index = 0  # Track frame index for alert intervals

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frames.append(frame)
        frame_index += 1

        if len(frames) == BATCH_SIZE:
            process_batch(frames, video_name, out, frame_index, REQUIRED_PPE, MAX_PERSONS)
            frames = []  # Reset frame batch

    # Process remaining frames
    if frames:
        process_batch(frames, video_name, out, frame_index, REQUIRED_PPE, MAX_PERSONS)

    cap.release()
    out.release()
    print(f"✅ Processed {video_name} -> {output_path}")


def process_batch(frames, video_name, out, frame_index, REQUIRED_PPE, MAX_PERSONS):
    """Process a batch of frames and log alerts."""
    results = model.predict(
        frames, 
        conf=CONFIDENCE_THRESHOLD, 
        classes=SPECIFIC_CLASSES, 
        device="cuda" if torch.cuda.is_available() else "cpu",
        batch=BATCH_SIZE,
        vid_stride=3
    )

    for i, result in enumerate(results):
        global_frame_number = frame_index - (len(results) - i)  
        if global_frame_number % ALERT_INTERVAL != 0:
            continue  

        detected_classes = [result.names[int(box.cls)] for box in result.boxes]

        # Count persons
        person_count = detected_classes.count("Person")
        if person_count > MAX_PERSONS and is_new_alert("Max Persons Exceeded"):
            save_alert_to_db("Max Persons Exceeded", video_name)

        # Check PPE for Each Person
        for _ in range(person_count):
            missing_ppe = [ppe for ppe in REQUIRED_PPE if ppe not in detected_classes]
            if missing_ppe and is_new_alert(f"Missing PPE: {', '.join(missing_ppe)}"):
                save_alert_to_db(f"Missing PPE: {', '.join(missing_ppe)}", video_name)

        # Save the frame with detections
        frame_with_detections = result.plot()
        out.write(frame_with_detections)


def main():
    """Process multiple videos in parallel."""
    print('*****************************************')
    video_files = [os.path.join(input_dir, f) for f in os.listdir(input_dir) if f.endswith((".mp4", ".avi", ".mov"))]

    print("📂 **Processing videos:**", video_files)

    # Use multiprocessing to handle videos concurrently
    with multiprocessing.Pool(processes=multiprocessing.cpu_count()) as pool:
        pool.map(process_video, video_files)


if __name__ == "__main__":
    main()
