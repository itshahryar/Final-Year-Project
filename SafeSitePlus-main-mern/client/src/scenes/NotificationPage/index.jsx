// // import { useState, useEffect } from 'react';
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { DataGrid } from '@mui/x-data-grid';
// // import { format } from 'date-fns';
// // import { IconButton, Button } from '@mui/material';
// // import { FiAlertCircle, FiCheckCircle, FiEye } from 'react-icons/fi';

// // export default function NotificationsPage() {
// // //   const { currentUser } = useSelector((state) => state.user);
// //   const navigate = useNavigate();
// //   const [notifications, setNotifications] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedNotifications, setSelectedNotifications] = useState([]);

// //   const sampleNotifications = [
// //     {
// //       id: '1',
// //       date: new Date().toISOString(),
// //       type: 'alert',
// //       message: 'Server downtime scheduled for tomorrow.',
// //       status: 'unread',
// //     },
// //     {
// //       id: '2',
// //       date: new Date(Date.now() - 86400000).toISOString(),
// //       type: 'info',
// //       message: 'Your password has been successfully changed.',
// //       status: 'read',
// //     },
// //     {
// //       id: '3',
// //       date: new Date(Date.now() - 172800000).toISOString(),
// //       type: 'alert',
// //       message: 'Update your profile to continue using all features.',
// //       status: 'unread',
// //     },
// //   ];

// //   useEffect(() => {
// //     const fetchNotifications = async () => {
// //       try {
// //         setLoading(true);
// //         await new Promise((resolve) => setTimeout(resolve, 1000));
// //         setNotifications(sampleNotifications);
// //       } catch (error) {
// //         console.error('Error fetching notifications:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchNotifications();
// //   }, []);

// //   const handleRowClick = (params) => {
// //     navigate(`/notification/${params.id}`);
// //   };

// //   const handleMarkAsRead = () => {
// //     alert('Actions not yet implemented');
// //   };

// //   const columns = [
// //     {
// //       field: 'date',
// //       headerName: 'Date',
// //       flex: 1,
// //       renderCell: (params) => format(new Date(params.value), 'MM/dd/yyyy'),
// //     },
// //     {
// //       field: 'time',
// //       headerName: 'Time',
// //       flex: 1,
// //       valueGetter: (params) => format(new Date(params.row.date), 'hh:mm a'),
// //     },
// //     {
// //       field: 'message',
// //       headerName: 'Description',
// //       flex: 2,
// //     },
// //     {
// //       field: 'type',
// //       headerName: 'Type',
// //       flex: 1,
// //       renderCell: (params) =>
// //         params.value === 'alert' ? (
// //           <span>
// //             <FiAlertCircle className="text-red-500 mr-2" />
// //             {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
// //           </span>
// //         ) : (
// //           <span>
// //             <FiCheckCircle className="text-green-500 mr-2" />
// //             {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
// //           </span>
// //         ),
// //     },
// //     {
// //       field: 'status',
// //       headerName: 'Status',
// //       flex: 1,
// //       renderCell: (params) => (
// //         <span
// //           className={`px-3 py-1 rounded-full ${
// //             params.value === 'read'
// //               ? 'bg-green-100 text-green-600'
// //               : 'bg-yellow-100 text-yellow-600'
// //           }`}
// //         >
// //           {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
// //         </span>
// //       ),
// //     },
// //     {
// //       field: 'actions',
// //       headerName: 'Actions',
// //       flex: 1,
// //       sortable: false,
// //       renderCell: (params) => (
// //         <IconButton onClick={() => handleRowClick(params.row)}>
// //           <FiEye className="text-slate-600 hover:text-slate-800" />
// //         </IconButton>
// //       ),
// //     },
// //   ];

// //   return (
// //     <main className="p-5 max-w-7xl mx-auto">
// //       <h1 className="text-3xl font-semibold text-center my-6">Notifications</h1>
// //       <div className="flex justify-end mb-4">
// //         <button
// //           onClick={() => alert('Actions not yet implemented')}
// //           className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
// //         >
// //           Mark Selected as Read
// //         </button>
// //       </div>
// //       <div style={{ height: 400, width: '100%' }}>
// //         <DataGrid
// //           rows={notifications}
// //           columns={columns}
// //           pageSize={5}
// //           checkboxSelection
// //           loading={loading}
// //           onRowClick={handleRowClick}
// //           onSelectionModelChange={(ids) => setSelectedNotifications(ids)}
// //           sx={{
// //             '& .MuiDataGrid-columnHeaders': {
// //               backgroundColor: '#64748b', // Slate color
// //               color: '#ffffff', // White text
// //               fontSize: '16px',
// //             },
// //           }}
// //         />
// //       </div>
// //     </main>
// //   );
// // }

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DataGrid } from '@mui/x-data-grid';
// import { format } from 'date-fns';
// import { IconButton } from '@mui/material';
// import { FiAlertCircle, FiEye } from 'react-icons/fi';
// import axios from 'axios';

// export default function NotificationsPage() {
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         setLoading(true);
//         // const { data } = await axios.get('http://localhost:5000/alerts/detectedAnomalies');
//         const { data } = await axios.get('http://localhost:8000/prioritized-alerts');
//         console.log(data);
        
//         setNotifications(data.prioritized_alerts.map((item) => ({
//           id: item._id,
//           siteId: item.siteId,
//           description: item.description,
//           date: item.detectedAt,
//         })));
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const handleRowClick = (params) => {
//     navigate(`/detailAlerts/${params.id}`);
//   };

  

//   const columns = [
//     {
//       field: 'date',
//       headerName: 'Date',
//       flex: 1,
//       renderCell: (params) => format(new Date(params.value), 'MM/dd/yyyy hh:mm a'),
//     },
//     {
//       field: 'description',
//       headerName: 'Description',
//       flex: 2,
//     },
//     {
//       field: 'siteId',
//       headerName: 'Site',
//       flex: 1,
//       renderCell: (params) =>{(params.SiteName)},
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       flex: 1,
//       sortable: false,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleRowClick(params.row)}>
//           <FiEye className="text-slate-600 hover:text-slate-800" />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <main className="p-5 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-6">Detected Anomalies</h1>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={notifications}
//           columns={columns}
//           pageSize={5}
//           loading={loading}
//           onRowClick={handleRowClick}
//           sx={{
//             '& .MuiDataGrid-columnHeaders': {
//               backgroundColor: '#64748b',
//               color: '#ffffff',
//               fontSize: '16px',
//             },
//           }}
//         />
//       </div>
//     </main>
//   );
// }

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DataGrid } from '@mui/x-data-grid';
// import { format } from 'date-fns';
// import { IconButton, TextField, MenuItem, Select, FormControl, InputLabel  , Button , useTheme} from '@mui/material';
// import { FiEye } from 'react-icons/fi';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import {
//   DownloadOutlined,
//   Email,
//   PointOfSale,
//   PersonAdd,
//   Traffic,
// } from "@mui/icons-material";

// export default function NotificationsPage() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [filteredNotifications, setFilteredNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [siteIdFilter, setSiteIdFilter] = useState('');
//   const [sensitivityFilter, setSensitivityFilter] = useState('');

//   const downloadExcel = () => {
//     const doc = new jsPDF();
//     doc.text("Supervisors Table", 20, 10);  // 20, 10 are cordinates
//     doc.autoTable({
//       head: [['Date', 'Description', 'Site Name']],
//       body: filteredNotifications.map(data => [
//         data.date,
//         data.description,
//         data.SiteName,
//     // Combine all site names into a single string
//       ]),
//     });
//     doc.save('Alerts.pdf');
//   }

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Alerts", 20, 10);  // 20, 10 are cordinates
//     doc.autoTable({
//       head: [['Date', 'Description','SiteID', 'Site Name' ,]],
//       body: filteredNotifications.map(data => [
//         data.date,
//         data.description,
//         data.siteId,
//         data.siteName,
//     // Combine all site names into a single string
//       ]),
//     });
//     doc.save('Alerts.pdf');
//   }

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get('http://localhost:8000/prioritized-alerts');
        
//         const formattedData = data.prioritized_alerts.map((item) => ({
//           id: item._id,
//           siteId: item.siteId.SiteID,
//           siteName: item.siteId.SiteName,
//           sensitivity: item.siteId.Sensitivity,
//           description: item.description,
//           date: item.detectedAt,
//         }));

//         setNotifications(formattedData);
//         setFilteredNotifications(formattedData);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   // Handle search and filtering
//   useEffect(() => {
//     let filteredData = notifications.filter((item) =>
//       item.description.toLowerCase().includes(search.toLowerCase())
//     );

//     if (siteIdFilter) {
//       setSensitivityFilter('')
//       filteredData = filteredData.filter((item) => item.siteId === siteIdFilter);
//     }

//     if (sensitivityFilter) {
//       setSiteIdFilter('')
//       filteredData = filteredData.filter((item) => item.sensitivity === sensitivityFilter);
//     }

//     setFilteredNotifications(filteredData);
//   }, [search, siteIdFilter, sensitivityFilter, notifications]);

//   const handleRowClick = (params) => {
//     navigate(`/detailAlerts/${params.id}`);
//   };

//   const columns = [
//     {
//       field: 'date',
//       headerName: 'Date',
//       flex: 1,
//       renderCell: (params) => format(new Date(params.value), 'MM/dd/yyyy hh:mm a'),
//     },
//     {
//       field: 'description',
//       headerName: 'Description',
//       flex: 5,
//     },
//     // {
//     //   field: 'siteName',
//     //   headerName: 'Site Name',
//     //   flex: 1,
//     // },
//     {
//       field: 'siteId',
//       headerName: 'Site ID',
//       flex: 1,
//     },
//     {
//       field: 'sensitivity',
//       headerName: 'Sensitivity',
//       flex: 1,
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       flex: 1,
//       sortable: false,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleRowClick(params.row)}>
//           <FiEye className="text-slate-600 hover:text-slate-800" />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <main className="p-5 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-6">Detected Anomalies</h1>

//       <Button
//             sx={{
//               backgroundColor: theme.palette.secondary.light,
//               color: theme.palette.background.alt,
//               fontSize: "12px",
//               fontWeight: "bold",
//               padding: "10px 20px",
            
//             }}
//             onClick={downloadPDF}
//           >
//       <DownloadOutlined sx={{ mr: "10px" }} />
     
//             Download Notifications as PDF
//           </Button>

//       {/* Search and Filters */}
//       <div className="flex gap-4 mb-4">
//         <TextField
//           label="Search Description"
//           variant="outlined"
//           fullWidth
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
        
//         <FormControl variant="outlined" fullWidth>
//           <InputLabel>Filter by Site ID</InputLabel>
//           <Select
//             value={siteIdFilter}
//             onChange={(e) => setSiteIdFilter(e.target.value)}
//             label="Filter by Site ID"
//           >
//             <MenuItem value="">All</MenuItem>
//             {[...new Set(notifications.map((item) => item.siteId))].map((siteId) => (
//               <MenuItem key={siteId} value={siteId}>{siteId}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl variant="outlined" fullWidth>
//           <InputLabel>Filter by Sensitivity</InputLabel>
//           <Select
//             value={sensitivityFilter}
//             onChange={(e) => setSensitivityFilter(e.target.value)}
//             label="Filter by Sensitivity"
//           >
//             <MenuItem value="">All</MenuItem>
//             {[...new Set(notifications.map((item) => item.sensitivity))].map((sensitivity) => (
//               <MenuItem key={sensitivity} value={sensitivity}>{sensitivity}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </div>

//       {/* Data Grid */}
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={filteredNotifications}
//           columns={columns}
//           pageSize={5}
//           loading={loading}
//           onRowClick={handleRowClick}
//           sx={{
//             '& .MuiDataGrid-columnHeaders': {
//               backgroundColor: '#64748b',
//               color: '#ffffff',
//               fontSize: '16px',
//             },
//           }}
//         />
//       </div>
//     </main>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import {
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  useTheme,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { FiEye } from "react-icons/fi";
import axios from "axios";
import jsPDF from "jspdf";
import { DownloadOutlined } from "@mui/icons-material";

export default function NotificationsPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [siteIdFilter, setSiteIdFilter] = useState("");
  const [sensitivityFilter, setSensitivityFilter] = useState("");

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Alerts Report", 20, 10);
    doc.autoTable({
      head: [["Date", "Description", "Site ID", "Site Name"]],
      body: filteredNotifications.map((data) => [
        format(new Date(data.date), "MM/dd/yyyy hh:mm a"),
        data.description,
        data.siteId,
        data.siteName,
      ]),
    });
    doc.save("Alerts_Report.pdf");
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:8000/prioritized-alerts"
        );

        const formattedData = data.prioritized_alerts.map((item) => ({
          id: item._id,
          siteId: item.siteId.SiteID,
          siteName: item.siteId.SiteName,
          sensitivity: item.siteId.Sensitivity,
          description: item.description,
          date: item.detectedAt,
        }));

        setNotifications(formattedData);
        setFilteredNotifications(formattedData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    let filteredData = notifications.filter((item) =>
      item.description.toLowerCase().includes(search.toLowerCase())
    );

    if (siteIdFilter) {
      setSensitivityFilter("");
      filteredData = filteredData.filter((item) => item.siteId === siteIdFilter);
    }

    if (sensitivityFilter) {
      setSiteIdFilter("");
      filteredData = filteredData.filter((item) => item.sensitivity === sensitivityFilter);
    }

    setFilteredNotifications(filteredData);
  }, [search, siteIdFilter, sensitivityFilter, notifications]);

  const handleRowClick = (params) => {
    navigate(`/detailAlerts/${params.id}`);
  };

  const columns = [
    {
      field: "date",
      headerName: "Date & Time",
      flex: 1.5,
      renderCell: (params) => format(new Date(params.value), "MM/dd/yyyy hh:mm a"),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
    },
    {
      field: "siteId",
      headerName: "Site ID",
      flex: 1,
    },
    {
      field: "sensitivity",
      headerName: "Sensitivity",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleRowClick(params.row)}>
          <FiEye style={{ color: "#1e88e5", fontSize: "1.5rem" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      {/* Header */}
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 3 }}>
        Detected Anomalies
      </Typography>

      {/* Download Button */}
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "8px 16px",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
          onClick={downloadPDF}
          startIcon={<DownloadOutlined />}
        >
          Download Report Now
        </Button>
      </Box>

      {/* Search & Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Search Description"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 2 }}
          />

          <FormControl variant="outlined" sx={{ flex: 1 }}>
            <InputLabel>Filter by Site ID</InputLabel>
            <Select
              value={siteIdFilter}
              onChange={(e) => setSiteIdFilter(e.target.value)}
              label="Filter by Site ID"
            >
              <MenuItem value="">All</MenuItem>
              {[...new Set(notifications.map((item) => item.siteId))].map(
                (siteId) => (
                  <MenuItem key={siteId} value={siteId}>
                    {siteId}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ flex: 1 }}>
            <InputLabel>Filter by Sensitivity</InputLabel>
            <Select
              value={sensitivityFilter}
              onChange={(e) => setSensitivityFilter(e.target.value)}
              label="Filter by Sensitivity"
            >
              <MenuItem value="">All</MenuItem>
              {[...new Set(notifications.map((item) => item.sensitivity))].map(
                (sensitivity) => (
                  <MenuItem key={sensitivity} value={sensitivity}>
                    {sensitivity}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Data Grid */}
      <Paper sx={{ p: 2 }}>
        <DataGrid
          rows={filteredNotifications}
          columns={columns}
          pageSize={5}
          loading={loading}
          autoHeight
          onRowClick={handleRowClick}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1565c0",
              color: "#ffffff",
              fontSize: "16px",
            },
            "& .MuiDataGrid-row": {
              "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" },
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#1565c0",
              color: "#fff",
            },
          }}
        />
      </Paper>
    </Box>
  );
}
