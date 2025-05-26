// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { DataGrid } from "@mui/x-data-grid";
// import { format } from "date-fns";
// import {
//   IconButton,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Button,
//   useTheme,
//   Box,
//   Paper,
//   Typography,
// } from "@mui/material";
// import { FiEye } from "react-icons/fi";
// import jsPDF from "jspdf";
// import { DownloadOutlined } from "@mui/icons-material";

// export default function NotificationsPage() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [filteredNotifications, setFilteredNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [siteIdFilter, setSiteIdFilter] = useState("");
//   const [sensitivityFilter, setSensitivityFilter] = useState("");
//   const [forecastingFilter, setForecastingFilter] = useState("");

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Alerts & Safety Analysis Report", 20, 10);
//     doc.autoTable({
//       head: [["Date", "Description", "Site ID", "Site Name", "Prediction", "Risk Level", "Recommendations"]],
//       body: filteredNotifications.map((data) => [
//         format(new Date(data.date), "MM/dd/yyyy hh:mm a"),
//         data.description,
//         data.siteId,
//         data.siteName,
//         data.forecastedPrediction || "N/A",
//         data.safetyAnalysis?.riskLevel || "N/A",
//         data.safetyAnalysis?.recommendations || "N/A",
//       ]),
//     });
//     doc.save("Alerts_Safety_Analysis_Report.pdf");
//   };

//   useEffect(() => {
//     const dummyData = [
//       {
//         id: 1,
//         siteId: "S01",
//         siteName: "Site A",
//         sensitivity: "High",
//         description: "Anomaly detected in temperature sensor.",
//         date: new Date(),
//         forecastedPrediction: "High likelihood of future anomaly",
//         safetyAnalysis: {
//           riskLevel: "Medium",
//           recommendations: `• Refresher training on PPE - Head Protection (observed 5 times)\n• Pause outdoor work due to storm\n• Conduct full safety audit`,
//         },
//       },
//       {
//         id: 2,
//         siteId: "S02",
//         siteName: "Site B",
//         sensitivity: "Medium",
//         description: "Motion detected in restricted area.",
//         date: new Date(),
//         forecastedPrediction: "Medium likelihood of future anomaly",
//         safetyAnalysis: {
//           riskLevel: "Low",
//           recommendations: "No recommendations needed",
//         },
//       },
//       {
//         id: 3,
//         siteId: "S03",
//         siteName: "Site C",
//         sensitivity: "Low",
//         description: "Unexpected power fluctuation.",
//         date: new Date(),
//         forecastedPrediction: "Low likelihood of future anomaly",
//         safetyAnalysis: {
//           riskLevel: "Low",
//           recommendations: "No recommendations needed",
//         },
//       },
//     ];
//     setNotifications(dummyData);
//     setFilteredNotifications(dummyData);
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     let filteredData = notifications.filter((item) =>
//       item.description.toLowerCase().includes(search.toLowerCase())
//     );

//     if (siteIdFilter) {
//       setSensitivityFilter("");
//       filteredData = filteredData.filter((item) => item.siteId === siteIdFilter);
//     }

//     if (sensitivityFilter) {
//       setSiteIdFilter("");
//       filteredData = filteredData.filter((item) => item.sensitivity === sensitivityFilter);
//     }

//     if (forecastingFilter) {
//       filteredData = filteredData.filter(
//         (item) => item.forecastedPrediction.includes(forecastingFilter)
//       );
//     }

//     setFilteredNotifications(filteredData);
//   }, [search, siteIdFilter, sensitivityFilter, notifications, forecastingFilter]);

//   const handleRowClick = (params) => {
//     navigate(`/detailAlerts/${params.id}`);
//   };

//   const columns = [
//     {
//       field: "date",
//       headerName: "Date & Time",
//       flex: 1.5,
//       renderCell: (params) => format(new Date(params.value), "MM/dd/yyyy hh:mm a"),
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       flex: 2.5,
//     },
//     {
//       field: "siteId",
//       headerName: "Site ID",
//       flex: 1,
//     },
//     {
//       field: "sensitivity",
//       headerName: "Sensitivity",
//       flex: 1,
//     },
//     {
//       field: "forecastedPrediction",
//       headerName: "Forecasted Prediction",
//       flex: 2,
//     },
//     {
//       field: "riskLevel",
//       headerName: "Risk Level",
//       flex: 1,
//       valueGetter: (params) => params.row.safetyAnalysis?.riskLevel || "N/A",
//     },
//     {
//       field: "recommendations",
//       headerName: "Key Recommendations",
//       flex: 2.5,
//       valueGetter: (params) => params.row.safetyAnalysis?.recommendations || "N/A",
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       sortable: false,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleRowClick(params.row)}>
//           <FiEye style={{ color: "#1e88e5", fontSize: "1.5rem" }} />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ maxWidth: 1400, mx: "auto", p: 3 }}>
//       {/* Header */}
//       <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 3 }}>
//         Detected Anomalies & Safety Analysis
//       </Typography>

//       {/* Download Button */}
//       <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
//         <Button
//           sx={{
//             backgroundColor: theme.palette.primary.main,
//             color: "#fff",
//             fontSize: "14px",
//             fontWeight: "bold",
//             padding: "8px 16px",
//             "&:hover": { backgroundColor: theme.palette.primary.dark },
//           }}
//           onClick={downloadPDF}
//           startIcon={<DownloadOutlined />}
//         >
//           Download Report
//         </Button>
//       </Box>

//       {/* Search & Filters */}
//       <Paper sx={{ p: 2, mb: 3 }}>
//         <Box display="flex" gap={2} flexWrap="wrap">
//           <TextField
//             label="Search Description"
//             variant="outlined"
//             fullWidth
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             sx={{ flex: 2 }}
//           />

//           <FormControl variant="outlined" sx={{ flex: 1 }}>
//             <InputLabel>Filter by Site ID</InputLabel>
//             <Select
//               value={siteIdFilter}
//               onChange={(e) => setSiteIdFilter(e.target.value)}
//               label="Filter by Site ID"
//             >
//               <MenuItem value="">All</MenuItem>
//               {[...new Set(notifications.map((item) => item.siteId))].map(
//                 (siteId) => (
//                   <MenuItem key={siteId} value={siteId}>
//                     {siteId}
//                   </MenuItem>
//                 )
//               )}
//             </Select>
//           </FormControl>

//           <FormControl variant="outlined" sx={{ flex: 1 }}>
//             <InputLabel>Filter by Sensitivity</InputLabel>
//             <Select
//               value={sensitivityFilter}
//               onChange={(e) => setSensitivityFilter(e.target.value)}
//               label="Filter by Sensitivity"
//             >
//               <MenuItem value="">All</MenuItem>
//               {[...new Set(notifications.map((item) => item.sensitivity))].map(
//                 (sensitivity) => (
//                   <MenuItem key={sensitivity} value={sensitivity}>
//                     {sensitivity}
//                   </MenuItem>
//                 )
//               )}
//             </Select>
//           </FormControl>

//           <FormControl variant="outlined" sx={{ flex: 1 }}>
//             <InputLabel>Filter by Forecasting</InputLabel>
//             <Select
//               value={forecastingFilter}
//               onChange={(e) => setForecastingFilter(e.target.value)}
//               label="Filter by Forecasting"
//             >
//               <MenuItem value="">All</MenuItem>
//               <MenuItem value="High likelihood of future anomaly">High</MenuItem>
//               <MenuItem value="Medium likelihood of future anomaly">Medium</MenuItem>
//               <MenuItem value="Low likelihood of future anomaly">Low</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Paper>

//       {/* Data Grid */}
//       <Paper sx={{ p: 2 }}>
//         <DataGrid
//           rows={filteredNotifications}
//           columns={columns}
//           pageSize={5}
//           loading={loading}
//           autoHeight
//           onRowClick={handleRowClick}
//           sx={{
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: "#1565c0",
//               color: "#ffffff",
//               fontSize: "16px",
//             },
//             "& .MuiDataGrid-row": {
//               "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" },
//             },
//             "& .MuiDataGrid-footerContainer": {
//               backgroundColor: "#1565c0",
//               color: "#fff",
//             },
//           }}
//         />
//       </Paper>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  ListItemIcon,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend } from 'recharts';

const SafetyAnalyticsScreen = () => {
  const [analyticsData] = useState([
    {
      SiteID: 'site_001',
      SiteName: 'Alpha Construction Site',
      PredictedRiskLevel: 'High',
      WeatherCondition: 'Stormy',
      WeatherSeverity: 'Severe',
      TotalAnomalies30Days: 45,
      RecentAnomalies7Days: 12,
      AnomalyBreakdown: {
        PPE_Compliance: 18,
        Equipment_Safety: 10,
        Unauthorized_Access: 9,
        Fall_Hazards: 8,
      },
      DailyAnomalyPattern: {
        '2024-04-21': 5,
        '2024-04-22': 3,
        '2024-04-23': 7,
        '2024-04-24': 2,
        '2024-04-25': 6,
        '2024-04-26': 4,
        '2024-04-27': 8,
      },
      Recommendations: {
        PPE_Training: true,
        Secure_Equipment: true,
        Strengthen_Access_Control: true,
        Fall_Protection_Programs: true,
        Weather_Precautions: ['Halt operations during severe storms', 'Provide weatherproof gear'],
      },
      LastUpdated: '2024-04-27T14:00:00Z',
    },
    {
      SiteID: 'site_002',
      SiteName: 'Beta Renovation Project',
      PredictedRiskLevel: 'Moderate',
      WeatherCondition: 'Clear',
      WeatherSeverity: 'Mild',
      TotalAnomalies30Days: 20,
      RecentAnomalies7Days: 5,
      AnomalyBreakdown: {
        PPE_Compliance: 5,
        Equipment_Safety: 7,
        Unauthorized_Access: 3,
        Fall_Hazards: 5,
      },
      DailyAnomalyPattern: {
        '2024-04-21': 2,
        '2024-04-22': 1,
        '2024-04-23': 3,
        '2024-04-24': 2,
        '2024-04-25': 4,
        '2024-04-26': 3,
        '2024-04-27': 5,
      },
      Recommendations: {
        PPE_Training: true,
        Secure_Equipment: true,
        Strengthen_Access_Control: false,
        Fall_Protection_Programs: true,
        Weather_Precautions: [],
      },
      LastUpdated: '2024-04-27T14:00:00Z',
    },
  ]);

  const theme = useTheme();

  // Dummy Data for Pie Chart
  const riskData = [
    { name: 'High Risk', value: 60 },
    { name: 'Moderate Risk', value: 25 },
    { name: 'Low Risk', value: 15 },
  ];

  const COLORS = ['#FF6F61', '#FFBB28', '#00C49F'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 4,
        bgcolor: 'linear-gradient(to bottom, #f3f4f6, #e0f7fa)',
        backgroundSize: 'cover',
      }}
    >
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          Forecasting Analytics Dashboard
        </Typography>
        <Typography variant="h6" color="text.primary" fontFamily="Dancing Script">
          Monitoring your sites for better safety 🏗️
        </Typography>
      </Box>

      {analyticsData.map((site) => (
        <Paper
          key={site.SiteID}
          elevation={6}
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={1}
            sx={{
                color: '#fff', // White text
                backgroundColor: '#9e9e9e', // Grey background
                padding: '0.5rem 1rem', // Padding inside the badge
                borderRadius: '20px', // Rounded corners
                display: 'inline-block', // Keeps the badge size to the content
                transition: 'background-color 0.3s', // Smooth transition on hover
                '&:hover': {
                backgroundColor: '#616161', // Darker grey when hovered
                },
            }}
            >
            {site.SiteName}
            </Typography>

  <Typography
    variant="subtitle1"
    color="error"
    display="flex"
    alignItems="center"
    mb={2}
  >
    <WarningAmberIcon sx={{ mr: 1 }} /> Current Risk Level: {site.PredictedRiskLevel}
  </Typography>

  <Typography variant="body1" mb={1} sx={{ color: '#000' }}>
    <strong>Weather:</strong> {site.WeatherCondition} (Severity: {site.WeatherSeverity})
  </Typography>

  <Typography variant="body1" mb={1} sx={{ color: '#000' }}>
    <strong>Total Anomalies (30 days):</strong> {site.TotalAnomalies30Days}
  </Typography>

  <Typography variant="body1" mb={2} sx={{ color: '#000' }}>
    <strong>Recent Anomalies (7 days):</strong> {site.RecentAnomalies7Days}
  </Typography>

  <Divider
  sx={{
    my: 2,
    backgroundColor: (theme) =>
      theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0', // Black in dark mode, light gray in light mode
  }}
/>

  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#000' }}>
    Anomaly Breakdown
  </Typography>

  <List dense>
    {Object.entries(site.AnomalyBreakdown).map(([key, value]) => (
      <ListItem key={key}>
        <ListItemText
          primaryTypographyProps={{ sx: { color: '#000' } }}
          primary={`${key.replace(/_/g, ' ')}: ${value}`}
        />
      </ListItem>
    ))}
  </List>
</Grid>

            {/* Chart */}
            <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#000' }}>
                Risk Factor Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <PieTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
          <Divider
            sx={{
                my: 2,
                backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0', // Black in dark mode, light gray in light mode
            }}
            />

{/* Recommendations */}
<Box mt={4}>
  <Typography variant="h6" fontWeight="bold" mb={2} sx={{ color: '#000' }}>
    Recommendations
  </Typography>
  <List dense>
    {Object.entries(site.Recommendations).map(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return null;
      return (
        <ListItem key={key} sx={{ paddingLeft: 0 }}> {/* Remove default padding */}
          {/* Bullet Icon */}
          <ListItemIcon sx={{ minWidth: 'auto', marginRight: '8px' }}> {/* Adjust marginRight */}
            <Typography
              variant="body2"
              sx={{
                color: '#000',
                fontWeight: 600,
                marginRight: 0, // Adjust spacing between bullet and text
                fontSize: '1rem', // Adjust font size for the bullet if needed
              }}
            >
              •
            </Typography>
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography variant="body2" sx={{ color: '#000', marginLeft: 0 }}>
                <strong>{key.replace(/_/g, ' ')}:</strong> {Array.isArray(value) ? value.join(', ') : value.toString()}
              </Typography>
            }
          />
        </ListItem>
      );
    })}
  </List>
</Box>

          <Divider
            sx={{
                my: 2,
                backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0', // Black in dark mode, light gray in light mode
            }}
            />

          <Grid item xs={12} sm={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#000' }}>
                Daily Anomalies
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={Object.entries(site.DailyAnomalyPattern).map(([date, count]) => ({ date, count }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#1976d2" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
          
          {/* Footer */}
          <Typography variant="caption" sx={{ color: '#000' }} mt={2} display="block">
            Last Updated: {new Date(site.LastUpdated).toLocaleString()}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default SafetyAnalyticsScreen;
