import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StatsCard = ({ title, value, color }) => {
  return (
    <Card
      sx={{
        textAlign: "center",
        bgcolor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
        p: 3,
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

