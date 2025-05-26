from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime, timezone
from pymongo import MongoClient
import random

# MongoDB setup
client = MongoClient("mongodb+srv://Zamin2:gApHkOeeOGY14ML5@cluster0.8cadg.mongodb.net/")
db = client["test"]
site_collection = db["sites"]
anomaly_collection = db["Alerts"]

app = FastAPI()

class SafetyForecastingEngine:
    def __init__(self):
        self.risk_factors = {
            "PPE": {
                "Hardhat": 0.8,
                "SafetyVest": 0.7,
                "Gloves": 0.5,
                "Boots": 0.4
            },
            "Fall": 1.0,
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
        condition = random.choice(["Storm", "Rain", "Hot", "Clear"])
        return {
            "condition": condition,
            "max_temp": random.randint(25, 45),
            "humidity": random.randint(30, 90),
            "risk_factor": self.risk_factors["Weather"].get(condition, 0.5)
        }

    def analyze_site(self, site: Dict[str, Any]) -> Dict[str, Any]:
        site_id = site["_id"]
        alerts = list(anomaly_collection.find({"siteId": site_id}))
        weather = self.get_weather_forecast(site["City"])
        risk_breakdown = self._calculate_risk_scores(alerts, weather, site["Sensitivity"])
        recommendations = self._generate_recommendations(risk_breakdown, weather, len(alerts))
        return {
            "site_id": str(site_id),
            "site_name": site["SiteName"],
            "risk_breakdown": risk_breakdown,
            "weather": weather,
            "recommendations": recommendations,
            "analysis_date": datetime.now(timezone.utc).isoformat()
        }

    def _calculate_risk_scores(self, alerts: List[Dict[str, Any]],
                               weather: Dict[str, Any],
                               sensitivity: str) -> Dict[str, float]:
        scores = {
            "ppe_risk": 0,
            "fall_risk": 0,
            "weather_risk": weather["risk_factor"],
            "sensitivity_risk": self.risk_factors["Sensitivity"][sensitivity],
            "total_risk": 0
        }

        for alert in alerts:
            desc = alert["description"].lower()
            for ppe_type, weight in self.risk_factors["PPE"].items():
                if ppe_type.lower() in desc:
                    count = self._extract_count(desc, ppe_type)
                    scores["ppe_risk"] += weight * count
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
        keyword = keyword.lower()
        if keyword == "fall":
            if "fall" in description:
                parts = description.split("fall detected:")
                if len(parts) > 1:
                    count_str = parts[1].split("case")[0].strip()
                    return int(count_str) if count_str.isdigit() else 1
            return 1
        parts = description.split(keyword + ":")
        if len(parts) > 1:
            count_str = parts[1].split("missing")[0].strip()
            return int(count_str) if count_str.isdigit() else 1
        return 0

    def _generate_recommendations(self, risk_breakdown: Dict[str, float],
                                  weather: Dict[str, Any],
                                  total_alerts: int) -> Dict[str, Any]:
        recs = {
            "immediate_actions": [],
            "training_needed": [],
            "long_term_improvements": [],
            "weather_adjustments": [],
            "risk_level": "Low"
        }

        if risk_breakdown["total_risk"] > 0.7:
            recs["risk_level"] = "High"
        elif risk_breakdown["total_risk"] > 0.4:
            recs["risk_level"] = "Medium"

        if risk_breakdown["fall_risk"] > 0.5:
            recs["immediate_actions"].append("Conduct immediate fall hazard inspection")
        if risk_breakdown["ppe_risk"] > 0.6:
            recs["immediate_actions"].append("Perform PPE compliance audit today")

        if weather["risk_factor"] > 0.7:
            recs["weather_adjustments"].append(f"Implement severe weather protocol for {weather['condition']}")
        elif weather["risk_factor"] > 0.4:
            recs["weather_adjustments"].append(f"Adjust work schedule for {weather['condition']} conditions")

        if risk_breakdown["ppe_risk"] > 0.3:
            recs["training_needed"].append("PPE compliance training refresher")
        if risk_breakdown["fall_risk"] > 0.2:
            recs["training_needed"].append("Fall protection equipment training")

        if total_alerts > 10:
            recs["long_term_improvements"].append("Review and update safety protocols")
        if risk_breakdown["total_risk"] > 0.5:
            recs["long_term_improvements"].append("Install additional safety monitoring systems")

        return recs

    def analyze_all_sites(self):
        results = []
        for site in site_collection.find({"monitored": True}):
            results.append(self.analyze_site(site))
        return results

@app.get("/analyze-safety")
def analyze_safety():
    engine = SafetyForecastingEngine()
    results = engine.analyze_all_sites()
    return results
