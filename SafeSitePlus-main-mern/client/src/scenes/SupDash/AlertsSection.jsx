import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000";

const AlertsSection = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log("Fetching alerts...");
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/prioritized-alerts`);
        console.log(data);

        setNotifications(
          data.prioritized_alerts.map((item) => ({
            id: item._id,
            siteId: item.siteId,
            description: item.description,
            date: new Date(item.detectedAt),
          }))
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        boxShadow: 2,
        borderRadius: 2,
        bgcolor: "rgba(255, 255, 255, 0.5)", // Slightly transparent background
        backdropFilter: "blur(10px)", // Blur effect like PerformanceChart
        position: "relative",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Alerts!!
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "#D32F2F", "&:hover": { bgcolor: "#B71C1C" } }} // Red color theme
          size="small"
          onClick={() => navigate("/dashboard/supervisor/viewalerts")}
        >
          View All Alerts
        </Button>
      </Box>

      {/* Alerts Grid */}
      <Grid container spacing={2}>
        {notifications.slice(0, 3).map((alert) => (
          <Grid item xs={12} sm={4} key={alert.id}>
            <Box
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/detailAlerts/${alert.id}`)}
    >
            <Card
              sx={{
                boxShadow: 3,
                bgcolor: "rgba(255, 255, 255, 0.9)", // Light transparency
                backdropFilter: "blur(5px)",
                
              }}
            >
              <img
                src={`${API_BASE_URL}/alert-image/${alert.id}.jpg`}
                alt="Alert"
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  boxShadow: 3,
                  bgcolor: "rgba(255, 255, 255, 0.9)", // Light transparency
                  backdropFilter: "blur(5px)",
                  borderRadius: "0 0 8px 8px", // Smooth bottom corners
                }}
              >
                <Typography variant="body2" fontWeight="bold" color="black">
                  {alert.description}
                </Typography>
                <Typography variant="body2" color="black">
                  {format(alert.date, "MMMM dd, yyyy")}
                </Typography>
                <Typography variant="body2" color="black">
                  {format(alert.date, "hh:mm a")}
                </Typography>
              </CardContent>
            </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AlertsSection;

