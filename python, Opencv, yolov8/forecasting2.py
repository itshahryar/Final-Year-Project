# import pymongo
# import pandas as pd
# import numpy as np
# from datetime import datetime, timedelta
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import classification_report
# from statsmodels.tsa.arima.model import ARIMA
# import joblib
# import random
# from typing import List, Dict, Any

# # MongoDB Connection
# client = pymongo.MongoClient("mongodb+srv://Zamin2:gApHkOeeOGY14ML5@cluster0.8cadg.mongodb.net/")
# db = client["test"]
# site_collection = db["sites"]
# anomaly_collection = db["detectedanomalies"]




# class SafetyAnalyticsEngine:
#     def _init_(self):
#         self.weather_encoder = LabelEncoder()
#         self.weather_encoder.fit(["Clear", "Rain", "Storm", "Hot", "Cold"])
#         self.anomaly_types = {
#             "helmet": "PPE - Head Protection",
#             "vest": "PPE - High Visibility",
#             "gloves": "PPE - Hand Protection",
#             "boots": "PPE - Foot Protection",
#             "fall": "Fall Hazard",
#             "smoke": "Fire Hazard",
#             "fire": "Fire Hazard",
#             "chemical": "Hazardous Materials",
#             "machinery": "Equipment Safety"
#         }
        
#     def get_enhanced_weather_data(self) -> Dict[str, Any]:
#         """Generate realistic weather data with severity levels"""
#         weather_options = [
#             {"type": "Clear", "severity": 1, "risk_factor": 0.1},
#             {"type": "Rain", "severity": random.randint(1,3), "risk_factor": 0.4},
#             {"type": "Storm", "severity": random.randint(3,5), "risk_factor": 0.9},
#             {"type": "Hot", "severity": random.randint(2,4), "risk_factor": 0.3},
#             {"type": "Cold", "severity": random.randint(1,3), "risk_factor": 0.2}
#         ]
#         return random.choice(weather_options)
    
#     def categorize_anomaly(self, description: str) -> str:
#         """Categorize anomalies for better analysis"""
#         desc_lower = description.lower()
#         for keyword, category in self.anomaly_types.items():
#             if keyword in desc_lower:
#                 return category
#         return "Other Safety Issue"
    
#     def analyze_site_safety(self, site: Dict[str, Any]) -> Dict[str, Any]:
       
#         """Comprehensive safety analysis for a single site"""
#         site_id = site["_id"]
#         site_name = site["SiteName"]
#         current_sensitivity = site["Sensitivity"]
        
#         # Time windows for analysis
#         now = datetime.now()
#         past_30_days = now - timedelta(days=30)
#         past_7_days = now - timedelta(days=7)

        
#         # Get anomalies data
#         anomalies = list(anomaly_collection.find({
#             "siteId": site_id,
#             "createdAt": {"$gte": past_30_days}
#         }))
#         print(anomalies , "Alerts founded")
#         # Enhanced weather data
#         weather_data = self.get_enhanced_weather_data()
        
#         # Anomaly statistics
#         total_anomalies = len(anomalies)
#         recent_anomalies = [a for a in anomalies if a["createdAt"] > past_7_days]
#         anomaly_categories = [self.categorize_anomaly(a["description"]) for a in anomalies]
        
#         # Time series analysis
#         daily_counts = self._calculate_daily_anomalies(anomalies, past_30_days)
        
#         # Risk prediction
#         risk_level, risk_factors = self._predict_risk(
#             anomalies, 
#             weather_data,
#             current_sensitivity
#         )
        
#         # Generate recommendations
#         recommendations = self._generate_recommendations(
#             anomaly_categories,
#             total_anomalies,
#             risk_level,
#             weather_data,
#             current_sensitivity
#         )
        
#         return {
#             "SiteID": str(site_id),
#             "SiteName": site_name,
#             "CurrentSensitivity": current_sensitivity,
#             "WeatherCondition": weather_data["type"],
#             "WeatherSeverity": weather_data["severity"],
#             "TotalAnomalies30Days": total_anomalies,
#             "RecentAnomalies7Days": len(recent_anomalies),
#             "AnomalyBreakdown": pd.Series(anomaly_categories).value_counts().to_dict(),
#             "DailyAnomalyPattern": daily_counts,
#             "PredictedRiskLevel": risk_level,
#             "RiskFactors": risk_factors,
#             "Recommendations": recommendations,
#             "LastUpdated": now.isoformat()
#         }
    
#     def _calculate_daily_anomalies(self, anomalies: List[Dict[str, Any]], 
#                                  start_date: datetime) -> Dict[str, int]:
#         """Calculate daily anomaly counts for time series analysis"""
#         date_range = pd.date_range(start_date, datetime.now())
#         daily_counts = {date.strftime('%Y-%m-%d'): 0 for date in date_range}
        
#         for anomaly in anomalies:
#             date_str = anomaly["createdAt"].strftime('%Y-%m-%d')
#             if date_str in daily_counts:
#                 daily_counts[date_str] += 1
                
#         return daily_counts
    
#     def _predict_risk(self, anomalies: List[Dict[str, Any]], 
#                      weather_data: Dict[str, Any], 
#                      current_sensitivity: str) -> tuple:
#         """Predict risk level using enhanced features"""
#         # Feature engineering
#         features = {
#             "anomaly_count_7d": len([a for a in anomalies if a["createdAt"] > datetime.now() - timedelta(days=7)]),
#             "anomaly_count_30d": len(anomalies),
#             "weather_severity": weather_data["severity"],
#             "weather_risk": weather_data["risk_factor"],
#             "sensitivity": {"Low": 0, "Medium": 1, "High": 2}[current_sensitivity],
#             "day_of_week": datetime.now().weekday(),
#             "time_of_day": datetime.now().hour
#         }
        
#         # Convert to feature vector
#         X = np.array([[
#             features["anomaly_count_7d"],
#             features["anomaly_count_30d"],
#             features["weather_severity"],
#             features["weather_risk"],
#             features["sensitivity"],
#             features["day_of_week"],
#             features["time_of_day"]
#         ]])
        
#         # Simple risk calculation (replace with trained model)
#         risk_score = min(1.0, (
#             0.3 * (features["anomaly_count_7d"] / 10) +
#             0.2 * (features["anomaly_count_30d"] / 30) +
#             0.3 * features["weather_risk"] +
#             0.2 * (features["sensitivity"] / 2)
#         ))
        
#         risk_level = "Low"
#         if risk_score > 0.7:
#             risk_level = "High"
#         elif risk_score > 0.4:
#             risk_level = "Medium"
            
#         risk_factors = {
#             "RecentAnomalies": f"{features['anomaly_count_7d']} in last 7 days",
#             "WeatherImpact": f"{weather_data['type']} (Severity {weather_data['severity']})",
#             "CurrentSensitivity": current_sensitivity
#         }
        
#         return risk_level, risk_factors
    
#     def _generate_recommendations(self, 
#                                 anomaly_categories: List[str], 
#                                 total_anomalies: int,
#                                 risk_level: str,
#                                 weather_data: Dict[str, Any],
#                                 current_sensitivity: str) -> Dict[str, Any]:
#         """Generate actionable safety recommendations"""
#         recommendations = {
#             "sensitivity_adjustment": None,
#             "training_needs": [],
#             "operational_changes": [],
#             "weather_actions": [],
#             "priority": "Normal"
#         }
        
#         # Sensitivity adjustment
#         if risk_level == "High" and current_sensitivity != "High":
#             recommendations["sensitivity_adjustment"] = "Increase to High"
#         elif risk_level == "Low" and current_sensitivity == "High":
#             recommendations["sensitivity_adjustment"] = "Consider reducing to Medium"
        
#         # Training recommendations based on anomaly types
#         category_counts = pd.Series(anomaly_categories).value_counts()
#         for category, count in category_counts.items():
#             if count > 3:  # Threshold for training recommendation
#                 recommendations["training_needs"].append(
#                     f"Refresher training on {category} (observed {count} times)"
#                 )
        
#         # Weather-related actions
#         if weather_data["type"] == "Storm":
#             recommendations["weather_actions"].append(
#                 "Consider pausing outdoor work due to storm conditions"
#             )
#             recommendations["priority"] = "High"
#         elif weather_data["type"] == "Hot" and weather_data["severity"] >= 4:
#             recommendations["weather_actions"].extend([
#                 "Increase hydration breaks",
#                 "Monitor workers for heat stress"
#             ])
        
#         # High anomaly volume recommendation
#         if total_anomalies > 15:
#             recommendations["operational_changes"].append(
#                 "Conduct full safety audit of site operations"
#             )
#             recommendations["priority"] = "High"
#         elif total_anomalies > 5:
#             recommendations["priority"] = "Elevated"
        
#         return recommendations

# # Main execution
# if __name__ == "__main__":
    
#     analytics = SafetyAnalyticsEngine()
#     results = []
    
#     for site in site_collection.find():
#         site_analysis = analytics.analyze_site_safety(site)
#         results.append(site_analysis)
        
        
#         print(f"\nSafety Analysis for {site['SiteName']}:")
#         print(f"Current Risk Level: {site_analysis['PredictedRiskLevel']}")
#         print("Key Recommendations:")
#         for rec_type, rec_list in site_analysis['Recommendations'].items():
#             if rec_list and len(rec_list) > 0:
#                 print(f"- {rec_type.replace('_', ' ').title()}:")
#                 for item in rec_list if isinstance(rec_list, list) else [rec_list]:
#                     print(f"  • {item}")
    
#     # Save results to MongoDB
#     # db["safety_analytics"].insert_many(results)
#     print("\nAnalysis completed and saved to database.")
from bson import ObjectId
import pandas as pd
import numpy as np
from datetime import datetime, timedelta, timezone
from typing import Dict, List, Any
import random
from pymongo import MongoClient
from sklearn.preprocessing import MinMaxScaler

client = MongoClient("mongodb+srv://Zamin2:gApHkOeeOGY14ML5@cluster0.8cadg.mongodb.net/")
db = client["test"]
site_collection = db["sites"]
anomaly_collection = db["Alerts"]

class SafetyAnalyticsEngine:
    def __init__(self):
        self.risk_factors = {
            "PPE": {
                "Hardhat": 0.8,
                "SafetyVest": 0.7,
                "Gloves": 0.5,
                "Boots": 0.4
            },
            "Fall": 1.0,  # Highest risk factor
            "Weather": {
                "Storm": 0.9,
                "Hot": 0.6,
                "Rain": 0.7,
                "Cold": 0.4,
                "Clear": 0.1
            },
            "Sensitivity": {
                "High": 0.8,
                "Medium": 0.5,
                "Low": 0.2
            }
        }
        
    def get_weather_forecast(self, city: str) -> Dict[str, Any]:
        """Get weather forecast with risk assessment"""
        conditions = ["Storm", "Rain", "Hot", "Clear", "Cold"]
        condition = random.choice(conditions)
        forecast = {
            "type": condition,
            "severity": random.randint(1, 5),
            "risk_factor": self.risk_factors["Weather"].get(condition, 0.5),
            "max_temp": random.randint(25, 45),
            "humidity": random.randint(30, 90)
        }
        return forecast
    
    def analyze_site(self, site: Dict[str, Any]) -> Dict[str, Any]:
        """Comprehensive safety analysis for a site with consistent output structure"""
        site_id = site["_id"]  # Keep as ObjectId for MongoDB queries
        site_name = site["SiteName"]
        sensitivity = site.get("Sensitivity", "Medium")
        
        print(f"\n🔍 Analyzing site: {site_name} (ID: {site_id})")
        
        # Get all alerts for this site (using ObjectId directly)
        alerts = list(anomaly_collection.find({"siteId": site_id}))
        print(f"📊 Total alerts found: {len(alerts)}")
        
        # Weather analysis
        weather = self.get_weather_forecast(site.get("City", "Unknown"))
        print(f"⛅ Weather condition: {weather['type']} (Severity: {weather['severity']})")
        
        # Calculate risk scores
        risk_breakdown = self._calculate_risk_scores(alerts, weather, sensitivity)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(risk_breakdown, weather, len(alerts))
        
        # Categorize anomalies for breakdown
        anomaly_categories = self._categorize_alerts(alerts)
        
        # Create daily anomaly pattern (default to empty)
        daily_pattern = {str(datetime.now().date() - timedelta(days=i)): 0 for i in range(30)}
        
        # Prepare response with proper serialization
        response = {
            "SiteID": str(site_id),  # Convert ObjectId to string for JSON
            "SiteName": site_name,
            "CurrentSensitivity": sensitivity,
            "WeatherCondition": weather["type"],
            "WeatherSeverity": weather["severity"],
            "TotalAnomalies30Days": len(alerts),
            "RecentAnomalies7Days": len(alerts),
            "AnomalyBreakdown": anomaly_categories,
            "DailyAnomalyPattern": daily_pattern,
            "PredictedRiskLevel": recommendations["risk_level"],
            "RiskFactors": {
                "RecentAnomalies": f"{len(alerts)} in last 30 days",
                "WeatherImpact": f"{weather['type']} (Severity {weather['severity']})",
                "CurrentSensitivity": sensitivity
            },
            "Recommendations": {  # Fixed typo in key name
                "training_needs": recommendations["training_needed"],
                "operational_changes": recommendations["long_term_improvements"],
                "weather_actions": recommendations["weather_adjustments"],
                "priority": recommendations["risk_level"].title()
            },
            "LastUpdated": datetime.now(timezone.utc).isoformat()
        }
        
        return response
    
    def _categorize_alerts(self, alerts: List[Dict[str, Any]]) -> Dict[str, int]:
        """Categorize alerts into standard types"""
        categories = {
            "PPE - Head Protection": 0,
            "PPE - High Visibility": 0,
            "PPE - Hand Protection": 0,
            "PPE - Foot Protection": 0,
            "Fall Hazard": 0,
            "Fire Hazard": 0,
            "Hazardous Materials": 0,
            "Equipment Safety": 0,
            "Other Safety Issue": 0
        }
        
        for alert in alerts:
            desc = alert["description"].lower()
            
            if "hardhat" in desc or "helmet" in desc:
                categories["PPE - Head Protection"] += 1
            elif "vest" in desc:
                categories["PPE - High Visibility"] += 1
            elif "gloves" in desc:
                categories["PPE - Hand Protection"] += 1
            elif "boots" in desc:
                categories["PPE - Foot Protection"] += 1
            elif "fall" in desc:
                categories["Fall Hazard"] += 1
            elif "fire" in desc or "smoke" in desc:
                categories["Fire Hazard"] += 1
            elif "chemical" in desc:
                categories["Hazardous Materials"] += 1
            elif "machinery" in desc or "equipment" in desc:
                categories["Equipment Safety"] += 1
            else:
                categories["Other Safety Issue"] += 1
                
        return categories
    
    def _calculate_risk_scores(self, alerts: List[Dict[str, Any]], 
                             weather: Dict[str, Any], 
                             sensitivity: str) -> Dict[str, float]:
        """Calculate weighted risk scores"""
        scores = {
            "ppe_risk": 0,
            "fall_risk": 0,
            "weather_risk": weather["risk_factor"],
            "sensitivity_risk": self.risk_factors["Sensitivity"].get(sensitivity, 0.5),
            "total_risk": 0
        }
        
        for alert in alerts:
            desc = alert["description"].lower()
            
            # PPE Risk
            for ppe_type, weight in self.risk_factors["PPE"].items():
                if ppe_type.lower() in desc:
                    count = self._extract_count(desc, ppe_type)
                    scores["ppe_risk"] += weight * count
            
            # Fall Risk
            if "fall" in desc:
                count = self._extract_count(desc, "fall")
                scores["fall_risk"] += self.risk_factors["Fall"] * count
        
        weights = {
            "ppe_risk": 0.4,
            "fall_risk": 0.3,
            "weather_risk": 0.2,
            "sensitivity_risk": 0.1
        }
        
        scores["total_risk"] = (
            weights["ppe_risk"] * scores["ppe_risk"] +
            weights["fall_risk"] * scores["fall_risk"] +
            weights["weather_risk"] * scores["weather_risk"] +
            weights["sensitivity_risk"] * scores["sensitivity_risk"]
        )
        
        return scores
    
    def _extract_count(self, description: str, keyword: str) -> int:
        """Extract count of occurrences from alert description"""
        keyword = keyword.lower()
        if keyword in ["fall"]:
            if "fall" in description:
                parts = description.split("fall detected:")
                if len(parts) > 1:
                    count_str = parts[1].split("case")[0].strip()
                    return int(count_str) if count_str.isdigit() else 1
            return 1
        
        parts = description.split(keyword.lower() + ":")
        if len(parts) > 1:
            count_str = parts[1].split("missing")[0].strip()
            return int(count_str) if count_str.isdigit() else 1
        return 0
    
    def _generate_recommendations(self, risk_breakdown: Dict[str, float],
                                weather: Dict[str, Any],
                                total_alerts: int) -> Dict[str, Any]:
        """Generate prioritized recommendations"""
        recs = {
            "training_needed": [],
            "long_term_improvements": [],
            "weather_adjustments": [],
            "risk_level": "Low"
        }
        
        if risk_breakdown["total_risk"] > 0.7:
            recs["risk_level"] = "High"
        elif risk_breakdown["total_risk"] > 0.4:
            recs["risk_level"] = "Medium"
        
        if risk_breakdown["ppe_risk"] > 0.3:
            recs["training_needed"].append("PPE compliance training refresher")
        if risk_breakdown["fall_risk"] > 0.2:
            recs["training_needed"].append("Fall protection equipment training")
        
        if weather["risk_factor"] > 0.7:
            recs["weather_adjustments"].append(f"Implement severe weather protocol for {weather['type']}")
        elif weather["risk_factor"] > 0.4:
            recs["weather_adjustments"].append(f"Adjust work schedule for {weather['type']} conditions")
        
        if total_alerts > 10:
            recs["long_term_improvements"].append("Review and update safety protocols")
        if risk_breakdown["total_risk"] > 0.5:
            recs["long_term_improvements"].append("Install additional safety monitoring systems")
        
        return recs
    
    def analyze_all_sites(self) -> List[Dict[str, Any]]:
        """Analyze all monitored sites"""
        results = []
        for site in site_collection.find({"monitored": True}):
            try:
                results.append(self.analyze_site(site))
            except Exception as e:
                print(f"Error analyzing site {site.get('SiteName', 'Unknown')}: {str(e)}")
                continue
        
        print("\n✅ Analysis completed for all sites")
        return results