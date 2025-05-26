from fastapi import FastAPI
from pymongo import MongoClient
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from datetime import datetime
import motor.motor_asyncio
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URI = "mongodb+srv://Zamin2:gApHkOeeOGY14ML5@cluster0.8cadg.mongodb.net/"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client["test"]
alerts_collection = db["detectedanomalies"]
sites_collection = db["sites"]

# Sensitivity Mapping (Assigning Weights)
SENSITIVITY_WEIGHTS = {
    "Low": 1,
    "Medium": 2,
    "High": 3
}

async def fetch_alerts():
    """Fetch alerts and corresponding site data"""
    alerts = await alerts_collection.find().to_list(None)

    # Debugging: Print alerts to check if siteId exists
    print("Fetched Alerts:", alerts)

    site_ids = {str(alert["siteId"]) for alert in alerts if "siteId" in alert}

    if not site_ids:
        print("Warning: No valid siteId found in alerts!")

    # Convert site_id back to ObjectId for querying sites collection
    site_object_ids = [ObjectId(site_id) for site_id in site_ids]

    # Fetch site data for the alerts
    sites = await sites_collection.find({"_id": {"$in": site_object_ids}}).to_list(None)

    # Create a mapping of siteId (as string) to site data
    site_map = {str(site["_id"]): site for site in sites}

    return alerts, site_map

def extract_features(alerts, site_map):
    """Convert alerts into numerical features for clustering"""
    feature_data = []
    alert_map = {}

    for alert in alerts:
        alert_id = str(alert["_id"])
        description = alert.get("description", "")
        detected_at = alert.get("detectedAt", datetime.utcnow())  # Default to current time if missing
        site_id = str(alert.get("siteId", ""))  # Convert ObjectId to string, fallback to empty string

        if not site_id:
            print(f"Warning: Alert {alert_id} has no siteId, skipping...")
            continue  # Skip this alert

        # Extract missing PPE count from description
        missing_ppe_count = description.lower().count("missing")

        # Convert timestamp to numerical value (seconds from epoch)
        time_score = (datetime.utcnow() - detected_at).total_seconds()

        # Get site sensitivity weight
        site = site_map.get(site_id, {})
        sensitivity = site.get("Sensitivity", "Low")
        sensitivity_weight = SENSITIVITY_WEIGHTS.get(sensitivity, 1)

        # Feature Vector: [time_score, missing_ppe_count, sensitivity_weight]
        feature_data.append([time_score, missing_ppe_count, sensitivity_weight])
        alert_map[alert_id] = alert

    return np.array(feature_data), alert_map

def cluster_alerts(features, alert_map, n_clusters=3):
    """Apply K-Means clustering for alert prioritization"""
    if len(features) < n_clusters:
        n_clusters = len(features)  # Ensure valid clustering

    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    labels = kmeans.fit_predict(features)

    # Assign priority labels to alerts
    priority_map = {}
    for idx, alert_id in enumerate(alert_map.keys()):
        priority_map[alert_id] = labels[idx]

    return priority_map

async def get_prioritized_alerts():
    """Fetch, process, and return prioritized alerts"""
    alerts, site_map = await fetch_alerts()

    if not alerts:
        print("No alerts found!")
        return []

    # Debug: Check if alerts have siteId before passing to extract_features
    for alert in alerts:
        if "siteId" not in alert:
            print(f"Error: Alert {alert['_id']} is missing siteId!")

    # Feature Extraction
    features, alert_map = extract_features(alerts, site_map)

    if features.size == 0:
        print("No valid feature data available for clustering!")
        return []

    # Clustering for prioritization
    priority_map = cluster_alerts(features, alert_map)

    # Sort alerts by priority level (lower is higher priority)
    sorted_alerts = sorted(alerts, key=lambda x: priority_map.get(str(x["_id"]), 0))

    return sorted_alerts

def serialize_mongo_document(doc):
    """ Recursively convert MongoDB documents to a JSON serializable format. """
    if isinstance(doc, dict):
        return {key: serialize_mongo_document(value) for key, value in doc.items()}
    elif isinstance(doc, list):
        return [serialize_mongo_document(item) for item in doc]
    elif isinstance(doc, ObjectId):
        return str(doc)  # Convert ObjectId to string
    elif isinstance(doc, datetime):
        return doc.isoformat()  # Convert datetime to ISO string
    return doc

@app.get("/prioritized-alerts")
async def prioritized_alerts():
    alerts = await get_prioritized_alerts()  # Fetch alerts from MongoDB
    
    # Convert the entire list of alerts into JSON serializable format
    serialized_alerts = serialize_mongo_document(alerts)
    
    return {"prioritized_alerts": serialized_alerts}

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from report import generate_report_data , reportusingLLM
from fastapi import FastAPI, Query
# from chatbot import get_pdf_response
from pydantic import BaseModel

from typing import List
from forecasting2 import SafetyAnalyticsEngine


from fastapi import FastAPI, WebSocket, WebSocketDisconnect , HTTPException
class QueryRequest(BaseModel):
    query: str

@app.get("/getreportdata")
def get_detection():
       return generate_report_data()

@app.get("/getreportbyLLM")
def get_detection():
       return reportusingLLM()

from weather import fetch_weather_forecast
@app.get("/weather")
def get_weather(city: str = Query(default="Lahore"), days: int = Query(default=7)):
    return fetch_weather_forecast(city, days)

# @app.post("/search")
# async def search_menu(request: QueryRequest):
#     query = request.query.strip()
#     if not query:
#         raise HTTPException(status_code=400, detail="Query cannot be empty.")
#     return get_pdf_response(query)

@app.get("/prediction", response_model=List[dict])
async def get_safety_analytics():
    try:
        analytics = SafetyAnalyticsEngine()
        results = analytics.analyze_all_sites()
        
        # Convert to your desired format
        formatted_results = []
        for result in results:
            formatted = {
                "SiteID": result["SiteID"],
                "SiteName": result["SiteName"],
                "PredictedRiskLevel": result["PredictedRiskLevel"],
                "WeatherCondition": result["WeatherCondition"],
                "WeatherSeverity": result["WeatherSeverity"],
                "TotalAnomalies30Days": result["TotalAnomalies30Days"],
                "RecentAnomalies7Days": result["RecentAnomalies7Days"],
                "AnomalyBreakdown": result["AnomalyBreakdown"],
                "DailyAnomalyPattern": result["DailyAnomalyPattern"],
                "Recommendations": {
                    "training_needs": result["Recommendations"]["training_needs"],
                    "operational_changes": result["Recommendations"]["operational_changes"],
                    "weather_actions": result["Recommendations"]["weather_actions"],
                    "priority": result["Recommendations"]["priority"]
                }
            }
            formatted_results.append(formatted)
        
        return formatted_results
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


from feb import SafetyForecastingEngine
@app.get("/prediction2")
async def get_safety_analytics():
    
    analytics = SafetyForecastingEngine()
    return analytics.analyze_all_sites()

from typing import Optional

from newfore import predictionUsingLLM
@app.get("/getSuggestionsLLM")
def get_detection(site_name: Optional[str] = None):
    try:
        # Initialize the forecasting engine
        analytics = SafetyForecastingEngine()
        
        # Get all site analytics data
        all_sites_data = analytics.analyze_all_sites()  # This should return a list of dicts

        # If site_name is provided, filter the data
        if site_name:
            filtered_data = next(
                (site for site in all_sites_data 
                 if site["site_name"].lower() == site_name.lower()), 
                None
            )

            if not filtered_data:
                raise HTTPException(
                    status_code=404, 
                    detail=f"Site '{site_name}' not found"
                )

            # Pass the single site data to LLM
            return predictionUsingLLM(filtered_data)

        # If no specific site requested, return predictions for all
        return [predictionUsingLLM(site) for site in all_sites_data]

    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Report generation failed: {str(e)}"
        )
    
