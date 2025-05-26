from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
import google.generativeai as genai

# Initialize FastAPI
app = FastAPI(
    title="SafeSite Plus Safety Reporting API",
    description="API for generating AI-powered construction safety reports",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Configuration
def get_db_client():
    return MongoClient("mongodb+srv://Zamin2:gApHkOeeOGY14ML5@cluster0.8cadg.mongodb.net/")

# AI Configuration
def setup_ai():
    genai.configure(api_key="AIzaSyAqc8qTbU1T7tjuIWcOsHv2wtgaDSQRkuc")
    return genai.GenerativeModel("gemini-1.5-flash")

# Initialize services
client = get_db_client()
db = client["test"]
model = setup_ai()

@app.get("/getreportbyLLM", summary="Generate safety report")
async def get_detection_report(
    site_name: Optional[str] = Query(
        None, 
        description="Filter reports by site name (case-insensitive)"
    ),
    full_details: bool = Query(
        False,
        description="Include raw data in response"
    )
):
    """
    Generate comprehensive safety reports using AI analysis.
    
    Can generate either:
    - A single report for a specific site (when site_name provided)
    - Reports for all monitored sites (when no site_name provided)
    """
    try:
        # Get all report data
        all_sites_data = generate_report_data()
        
        # Filter for specific site if requested
        if site_name:
            filtered_data = next(
                (site for site in all_sites_data 
                 if site["SiteName"].lower() == site_name.lower()), 
                None
            )
            if not filtered_data:
                raise HTTPException(
                    status_code=404, 
                    detail=f"Site '{site_name}' not found"
                )
            
            report = generate_llm_report(filtered_data)
            response = {
                "report": report,
                "metadata": {
                    "site_id": filtered_data["SiteID"],
                    "site_name": filtered_data["SiteName"],
                    "generated_at": datetime.now().isoformat()
                }
            }
            
            if full_details:
                response["raw_data"] = filtered_data
            
            return response
        
        # Generate reports for all sites
        reports = []
        for site in all_sites_data:
            try:
                report = generate_llm_report(site)
                reports.append({
                    "site_name": site["SiteName"],
                    "report": report,
                    "risk_level": site["PredictedRiskLevel"]
                })
            except Exception as e:
                reports.append({
                    "site_name": site["SiteName"],
                    "error": f"Report generation failed: {str(e)}"
                })
        
        return {
            "total_sites": len(reports),
            "reports": reports,
            "generated_at": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Report generation failed: {str(e)}"
        )

def generate_report_data():
    """Fetch and prepare safety data from MongoDB"""
    prediction_col = db["safety_analytics"]
    site_col = db["sites"]
    anomaly_col = db["detectedanomalies"]
    incident_col = db["anomalyresponses"]
    
    final_response = []
    predictions = list(prediction_col.find({}))
    
    for prediction in predictions:
        site_object_id = prediction["SiteID"]
        try:
            site = site_col.find_one({"_id": ObjectId(site_object_id)})
        except Exception as e:
            print(f"Invalid ObjectId: {site_object_id} - {e}")
            continue

        if not site:
            continue

        anomalies = list(anomaly_col.find({"siteId": site_object_id}))
        anomaly_ids = [a["_id"] for a in anomalies]

        incident_stats = {
            "Resolved": 0,
            "Unresolved": 0,
            "In Progress": 0
        }

        if anomaly_ids:
            pipeline = [
                {"$match": {"anomalyId": {"$in": anomaly_ids}}},
                {"$group": {"_id": "$status", "count": {"$sum": 1}}}
            ]
            incident_groups = list(incident_col.aggregate(pipeline))
            for item in incident_groups:
                status = item["_id"]
                count = item["count"]
                if status in incident_stats:
                    incident_stats[status] = count

        report_entry = {
            "SiteID": str(site["_id"]),
            "SiteName": site["SiteName"],
            "SiteAddress": site.get("SiteAddress", ""),
            "City": site.get("City", ""),
            "PredictedRiskLevel": prediction["PredictedRiskLevel"],
            "WeatherCondition": prediction["WeatherCondition"],
            "WeatherSeverity": prediction["WeatherSeverity"],
            "TotalAnomalies30Days": prediction["TotalAnomalies30Days"],
            "RecentAnomalies7Days": prediction["RecentAnomalies7Days"],
            "AnomalyBreakdown": prediction.get("AnomalyBreakdown", {}),
            "DailyAnomalyPattern": prediction.get("DailyAnomalyPattern", {}),
            "Recommendations": prediction.get("Recommendations", {}),
            "AnomalyCount": len(anomalies),
            "IncidentStats": incident_stats
        }

        final_response.append(report_entry)

    return final_response

def generate_llm_report(site_data: dict) -> str:
    """
    Generate formatted safety report using Gemini AI
    
    Args:
        site_data: Dictionary containing site safety metrics
        
    Returns:
        Formatted markdown report string
    """
    try:
        prompt = f"""
**SafeSite Plus Safety Report Generation**

**Instructions**:
1. Generate professional safety report in markdown format
2. Use clear section headers with ##
3. Include risk prioritization matrix
4. Provide actionable recommendations
5. Add compliance urgency indicators

**Site Data**:
{site_data}

**Report Structure**:
# SafeSite Plus Safety Report
## Executive Summary
- Brief overview of site status
- Key risk factors

## Risk Analysis
- Current risk level: {site_data.get('PredictedRiskLevel', 'Unknown')}
- Weather impact: {site_data.get('WeatherCondition', 'Unknown')} (Severity: {site_data.get('WeatherSeverity', 'N/A')})
- Anomaly trends: {site_data.get('RecentAnomalies7Days', 0)} in last 7 days

## Incident Analysis
- Resolved: {site_data.get('IncidentStats', {}).get('Resolved', 0)}
- Unresolved: {site_data.get('IncidentStats', {}).get('Unresolved', 0)}
- In Progress: {site_data.get('IncidentStats', {}).get('In Progress', 0)}

## Action Plan
1. Immediate actions
2. Medium-term recommendations
3. Long-term improvements

**Company Footer**:
SafeSite Plus | 123 Safety Way, Construction City | reports@safesiteplus.example.com
"""
        response = model.generate_content(prompt)
        return response.text
        
    except Exception as e:
        raise ValueError(f"AI report generation failed: {str(e)}")

