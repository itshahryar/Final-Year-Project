import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);

  // Fetch weather data from the backend
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/weather/getAllWeatherData"
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  // Prepare data for visualization
  const temperatureData = [
    {
      time: weatherData.location.localtime,
      temperature: weatherData.current.temp_f,
    },
  ];

  const humidityData = [
    {
      time: weatherData.location.localtime,
      humidity: weatherData.current.humidity,
    },
  ];

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        🌤 Weather Dashboard haha
      </Typography>

      {/* Weather Stats */}
      <Grid container spacing={3} justifyContent="center">
        {[
          { title: "🌡 Temperature", value: `${weatherData.current.temp_c}°C`, color: "#f44336" },
          { title: "💧 Humidity", value: `${weatherData.current.humidity}%`, color: "#2196f3" },
          { title: "🌬 Wind Speed", value: `${weatherData.current.wind_kph} km/h`, color: "#4caf50" },
          { title: "🌡 Pressure", value: `${weatherData.current.pressure_mb} hPa`, color: "#ff9800" },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: stat.color, color: "white", textAlign: "center", py: 2 }}>
              <CardContent>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h4">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Temperature & Humidity Charts */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              🌡 Temperature Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <Line type="monotone" dataKey="temperature" stroke="#f44336" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              💧 Humidity Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={humidityData}>
                <Line type="monotone" dataKey="humidity" stroke="#2196f3" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

