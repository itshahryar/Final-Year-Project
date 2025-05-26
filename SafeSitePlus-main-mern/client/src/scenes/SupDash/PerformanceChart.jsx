"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function PerformanceChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Mock construction site incident data
    const mockData = [
      { createdAt: "2024-01-10", incidentsReported: 5 },
      { createdAt: "2024-02-15", incidentsReported: 8 },
      { createdAt: "2024-03-05", incidentsReported: 3 },
      { createdAt: "2024-04-20", incidentsReported: 12 },
      { createdAt: "2024-05-25", incidentsReported: 7 },
      { createdAt: "2024-06-30", incidentsReported: 10 },
    ];

    // Format data for the chart
    const formattedData = mockData.map((incident) => ({
      date: format(new Date(incident.createdAt), "MMM dd"), // Formatting date
      incidents: incident.incidentsReported,
    }));

    setChartData(formattedData);
  }, []);

  return (
    <Card
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
        p: 2,
      }}
    >
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            Incident Reports Trend
          </Typography>
        }
        subheader="Monthly incidents reported on construction sites"
      />
      <CardContent>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div
                        style={{
                          backgroundColor: "white",
                          border: "1px solid gray",
                          padding: "5px",
                          borderRadius: "5px",
                          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                          Incidents: {payload[0].value}
                        </p>
                        <p style={{ fontSize: "12px", color: "gray" }}>
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="incidents"
                stroke="#D32F2F"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
