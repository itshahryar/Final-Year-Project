from fastapi import FastAPI, Query
import requests


WEATHER_API_KEY = "f1209aee709e480aacc170950251005"

def fetch_weather_forecast(city: str = "Lahore", days: int = 7):
    url = f"http://api.weatherapi.com/v1/forecast.json?key={WEATHER_API_KEY}&q={city}&days={days}"
    response = requests.get(url)
    return response.json()

