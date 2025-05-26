from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient("mongodb+srv://Zamin2:gApHkOeeOGY14ML5@cluster0.8cadg.mongodb.net/")  # Replace with your Mongo URI
db = client["test"]

# Collections
prediction_col = db["safety_analytics"]
site_col = db["sites"]
anomaly_col = db["Alerts"]
incident_col = db["Incident_info"]

final_response = []
def generate_report_data():
    predictions = list(prediction_col.find({}))

    for prediction in predictions:
        site_object_id = prediction["SiteID"]
        try:
            site = site_col.find_one({ "_id": ObjectId(site_object_id) })
        except Exception as e:
            print(f"Invalid ObjectId: {site_object_id} - {e}")
            continue

        if not site:
            continue

        anomalies = list(anomaly_col.find({ "siteId": site_object_id }))
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
            "SiteAddress": site.get("SiteAddresss", ""),
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



import google.generativeai as genai
genai.configure(api_key="AIzaSyAqc8qTbU1T7tjuIWcOsHv2wtgaDSQRkuc")  # Replace with actual API key
model = genai.GenerativeModel("gemini-1.5-flash")
def reportusingLLM():
    res = generate_report_data()

    prompt = f"""
**Strict Formatting Instructions**:
1. Use exactly ONE newline between sections
2. Indent nested bullet points with 2 spaces
3. Align all emojis with one space after
4. Ensure no more than 1 blank line between site reports

**Template**:
## [SiteName] (SiteID: [id])
[emoji] [status] - [brief description]
- **Predicted Risk**: [level]
- **Weather**: [emoji] [condition] (Severity: [level])
- **Anomalies**: [count] in 7 days
- **Incidents**: [resolved]/[unresolved]/[in progress]
- **Priority**:
  • Level: [Low/Medium/High/Critical]
  • Factors: [factor1], [factor2]
- **Actions**:
  • [Priority 1 action]
  • [Priority 2 action]

Generate the report EXACTLY in this format for all sites.
"""
    response = model.generate_content(prompt)

    print("\n🔹 Gemini AI Response:")
    print("*********")
    print(response.text)
    print("*********")
    return clean_report(response.text)

def clean_report(text):
    # Fix indentation
    text = text.replace("\n   -", "\n  -")  # Standardize 2-space indent
    # Remove excessive newlines
    text = "\n".join([line for line in text.split("\n") if line.strip() != ""])
    # Ensure exactly one newline between reports
    text = text.replace("\n\n\n", "\n\n")
    return text

# Usage:
# cleaned_report = clean_report(response.text)
