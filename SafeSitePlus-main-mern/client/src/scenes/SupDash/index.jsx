// import React, { useState , useEffect} from "react";
// import AssignedSiteCard from "./AssignedSiteCard"; // Import the AssignedSiteCard component
// import NewHeader from "../../components/NewHeader"; // Import NewHeader here
// import Slider from "react-slick"; // Import react-slick
// import "slick-carousel/slick/slick.css"; // Import slick-carousel styles
// import "slick-carousel/slick/slick-theme.css";
// import { FaStickyNote, FaPen, FaFileDownload } from "react-icons/fa"; // Import icons for Notepad and Pen
// import { Line, Doughnut } from "react-chartjs-2"; // Import both Line and Doughnut charts
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
// //import "./index.css";
// import { useDispatch , useSelector } from "react-redux";
// import axios from 'axios';
// import { Box, Typography, Grid, Card, CardContent, Button, Select, MenuItem } from "@mui/material";
// import AssignedSiteCardList from "./AssignedSiteCardList";


// // Register all necessary Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const SupDash = () => {

//   const dispatch = useDispatch();
//   const [Mysites , setMysites] = useState([]);

//   const UserId  = useSelector((state) => state.global.userId);
//   // const UserId  = '675c24c6d8670f67b459203c'

//   // const fetchyourSites = async () => {
//   //   try {
//   //     // const response = await axios.get('http://localhost:5000/Site/myAll', {
//   //     //   params: { UserId },
//   //     // });
//   //     const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
//   //     console.log(response.data);

//   //     const allSites = response.data;
  
//   //     const updatedSiteData = allSites.map(site => ({
//   //       SiteID: site._id,
//   //       SiteName: site.name,
//   //       SiteAddress: site.address,
//   //       City: site.city,
//   //       Sensitivity: site.sensitivityLevel,
//   //     }));
  
//   //     setMysites(updatedSiteData);
  

//   //   } catch (error) {
//   //     console.error("Error fetching site data:", error);
//   //   }
//   // };

//   const sendidtobackend = async () =>{
//     try{
//       console.log("hn id backend p jany lagi")
//       const response = await axios.post(`http://localhost:5000/response/saveID/${UserId}`);

//     }
//     catch (error){
//       console.log(error);

//     }
//   }

//   const fetchyourSites = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
//       console.log("Response data:", response.data);
  
//       // Transform the response data
//       const allSites = response.data;

      
  
//       const updatedSiteData = allSites.map((site) => ({
//         SiteID: site._id,
//         SiteName: site.SiteName ,// Use either `SiteName` or `name`
//         SiteAddress: site.SiteAddress , // Use either `SiteAddress` or `address`
//         City: site.City ,
//         Sensitivity: site.Sensitivity , // Default value if `Sensitivity` is missing
//         Active: site.Active  // Ensure `Active` is handled correctly
//       }));
  
//       // Update state
//       setMysites(updatedSiteData);
//       // console.log("Transformed Mysites:", updatedSiteData);
//       console.log("All Mysite:", Mysites);
//       console.log("All Mysite:", Mysites.length);
//     } catch (error) {
//       console.error("Error fetching site data:", error);
//     }
//   };
  
  



// useEffect(() => {
 
//     fetchyourSites();
//     sendidtobackend();
// }, []);

// // useEffect(()=>{
// //   sendidtobackend();
// // },[]);



//   const tasks = [
//     "Task 1: Review Site A's incident report.",
//     "Task 2: Inspect Site B's camera setup.",
//     "Task 3: Check progress of Site C.",
//     "Task 4: Verify Site D's safety measures.",
//     "Task 5: Prepare materials for Site E.",
//     "Task 6: Review Site F's construction timeline.",
//     "Task 7: Conduct safety drill at Site G.",
//   ];

//   const SampleNextArrow = ({ onClick }) => (
//     <div
//       className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-yellow-500 z-10"
//       onClick={onClick}
//     >
//       &rarr;
//     </div>
//   );
  
//   const SamplePrevArrow = ({ onClick }) => (
//     <div
//       className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-yellow-500 z-10"
//       onClick={onClick}
//     >
//       &larr;
//     </div>
//   );

//   // const settings = {
//   //   dots: true,
//   //   infinite: true,
//   //   speed: 500,
//   //   slidesToShow: 3,
//   //   slidesToScroll: 1,
//   //   nextArrow: <SampleNextArrow />,
//   //   prevArrow: <SamplePrevArrow />,
//   //   responsive: [
//   //     { breakpoint: 1024, settings: { slidesToShow: 2 } },
//   //     { breakpoint: 768, settings: { slidesToShow: 1 } },
//   //   ],
//   // };

//   const settings = {
//     dots: true,
//     infinite: Mysites.length > 1, // Enable infinite scrolling only if more than one site
//     speed: 500,
//     slidesToShow: Mysites.length > 3 ? 3 : Mysites.length, // Show only the available number of sites
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: Mysites.length > 2 ? 2 : Mysites.length } },
//       { breakpoint: 768, settings: { slidesToShow: 1 } },
//     ],
//   };

//   const [taskLimit, setTaskLimit] = useState();
//   const [showMore, setShowMore] = useState(true);

//   const handleShowMore = () => {
//     setTaskLimit(taskLimit + 5);
//     setShowMore(false);
//   };

//   const handleShowLess = () => {
//     setTaskLimit(5);
//     setShowMore(true);
//   };

//   const lineData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//     datasets: [
//       {
//         label: "Incidents",
//         data: [10, 20, 15, 25, 18, 30, 22],
//         borderColor: "rgba(255, 99, 132, 1)",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         tension: 0.4,
//       },
//       {
//         label: "Resolved Incidents",
//         data: [5, 15, 10, 20, 15, 25, 18],
//         borderColor: "rgba(54, 162, 235, 1)",
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         tension: 0.4,
//       },
//       {
//         label: "New Anomalies",
//         data: [2, 8, 5, 12, 9, 15, 10],
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         tension: 0.4,
//       },
//     ],
//   };

//   const lineOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Monthly Incident Trends" },
//     },
//   };

//   // Data for the donut chart
//   const data = {
//     labels: ['Completed', 'In Progress', 'Pending'], // Labels
//     datasets: [
//       {
//         data: [65, 25, 10], // Data values
//         backgroundColor: ['#34D399', '#F59E0B', '#EF4444'], // Colors for each section
//         borderWidth: 0, // No border
//       },
//     ],
//   };

//   // Options for customizing the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             return `${tooltipItem.label}: ${tooltipItem.raw}%`;
//           },
//         },
//       },
//     },
//   };

//   const [assignedSites, setAssignedSites] = useState([]);

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "linear-gradient(to bottom, #F59E0B, #FDE68A, #FEF3C7)", p: 4 }}>
//       <Box sx={{ p: 6, bgcolor: "rgba(255, 255, 255, 0.3)", borderRadius: 2, boxShadow: 3, backdropFilter: "blur(10px)" }}>
//         {/* Welcome Section */}
//         <Box textAlign="center" mb={4}>
//           <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
//             Welcome, Esteemed Supervisor!
//           </Typography>
//           <Typography variant="h6" fontFamily="Dancing Script" color="text.secondary">
//             Your expertise and leadership are truly making a difference. Keep up the amazing work!
//           </Typography>
//         </Box>

//         <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Assigned Sites</h2>
//       <AssignedSiteCardList assignedSites={assignedSites} />
//     </div>

//         {/* Overview Cards */}
//         <Grid container spacing={3}>
//           {[
//             { title: "Total Incidents", value: 50, color: "error.main" },
//             { title: "Workers Injured", value: 12, color: "warning.main" },
//             { title: "Pending Anomalies", value: 8, color: "success.main" },
//           ].map((stat, index) => (
//             <Grid item xs={12} sm={4} key={index}>
//               <Card sx={{ textAlign: "center", bgcolor: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)", p: 3, transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}>
//                 <CardContent>
//                   <Typography variant="h6">{stat.title}</Typography>
//                   <Typography variant="h4" fontWeight="bold" sx={{ color: stat.color }}>
//                     {stat.value}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Incident Trends Section */}
//         <Grid container spacing={3} mt={3}>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ p: 3 }}>
//               <Typography variant="h6" textAlign="center">Monthly Incident Trends</Typography>
//               <Box height={250}>
//                 <Line data={{ labels: ["Jan", "Feb", "Mar"], datasets: [{ data: [5, 10, 15] }] }} />
//               </Box>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ p: 3 }}>
//               <Typography variant="h6" textAlign="center">Today Incident Trends</Typography>
//               <Box height={250}>
//                 <Line data={{ labels: ["8 AM", "10 AM"], datasets: [{ data: [2, 4] }] }} />
//               </Box>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Notifications & Stats */}
//         <Grid container spacing={3} mt={3}>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ p: 3 }}>
//               <Typography variant="h6">Notifications/Alerts</Typography>
//               <Box height={100} sx={{ overflowY: "auto" }}>
//                 {["New incident at Site A", "Camera disconnected"].map((alert, i) => (
//                   <Typography key={i} sx={{ bgcolor: "yellow.500", color: "white", p: 1, borderRadius: 1, mb: 1 }}>
//                     - {alert}
//                   </Typography>
//                 ))}
//               </Box>
//               <Button fullWidth variant="contained" color="warning" sx={{ mt: 2 }}>
//                 See More
//               </Button>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ p: 3 }}>
//               <Typography variant="h6">Stats Overview</Typography>
//               <Box height={200}>
//                 <Doughnut data={{ labels: ["Resolved", "Pending"], datasets: [{ data: [60, 40] }] }} />
//               </Box>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Notepad & Reports */}
//         <Grid container spacing={3} mt={3}>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ p: 3 }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Box display="flex" alignItems="center">
//                   <FaPen color="#F59E0B" size={24} />
//                   <Typography variant="h6" ml={2}>Notepad</Typography>
//                 </Box>
//                 <Button variant="contained" color="warning">Go to Notepad</Button>
//               </Box>
//               <Box sx={{ height: 100, overflowY: "auto", p: 2 }}>
//                 {["Task 1", "Task 2"].map((task, i) => (
//                   <Typography key={i} sx={{ bgcolor: "green.300", p: 1, borderRadius: 1, mb: 1 }}>
//                     {task}
//                   </Typography>
//                 ))}
//               </Box>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Card sx={{ p: 3 }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Box display="flex" alignItems="center">
//                   <FaFileDownload color="#F59E0B" size={24} />
//                   <Typography variant="h6" ml={2}>Generate Reports</Typography>
//                 </Box>
//               </Box>
//               <Box mt={2}>
//                 <Typography>Select Format</Typography>
//                 <Select fullWidth variant="outlined" defaultValue="PDF" sx={{ bgcolor: "gray.100", borderRadius: 1 }}>
//                   <MenuItem value="PDF">PDF</MenuItem>
//                   <MenuItem value="Excel">Excel</MenuItem>
//                   <MenuItem value="CSV">CSV</MenuItem>
//                 </Select>
//                 <Button fullWidth variant="contained" color="warning" sx={{ mt: 2 }}>
//                   Generate Report
//                 </Button>
//               </Box>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default SupDash;

import React, { useState, useEffect } from "react";
import AssignedSiteCard from "./AssignedSiteCard"; // Import AssignedSiteCard component
import NewHeader from "../../components/NewHeader"; // Import NewHeader
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Import slick-carousel styles
import "slick-carousel/slick/slick-theme.css";
import { FaStickyNote, FaPen, FaFileDownload } from "react-icons/fa"; // Import icons
import { Line, Doughnut } from "react-chartjs-2"; // Import charts
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent, Button, Select, MenuItem } from "@mui/material";
import AssignedSiteCardList from "./AssignedSiteCardList";
import StatsCard from "./StatsCard";
import PerformanceChart from "./PerformanceChart";
import AlertsSection from "./AlertsSection";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const SupDash = () => {
  const dispatch = useDispatch();
  const [Mysites, setMysites] = useState([]);
  const UserId = useSelector((state) => state.global.userId);

  const sendidtobackend = async () => {
    try {
      console.log("Sending ID to backend...");
      await axios.post(`http://localhost:5000/response/saveID/${UserId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const stats = [
    { title: "Total Incidents", value: 50, color: "error.main" },
    { title: "Workers Injured", value: 12, color: "warning.main" },
    { title: "Pending Anomalies", value: 8, color: "success.main" },
  ];

  const fetchyourSites = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
      console.log("Response data:", response.data);

      const updatedSiteData = response.data.map((site) => ({
        SiteID: site._id,
        SiteName: site.SiteName,
        SiteAddress: site.SiteAddress,
        City: site.City,
        Sensitivity: site.Sensitivity,
        Active: site.Active
      }));

      setMysites(updatedSiteData);
      console.log("All Mysites:", Mysites.length);
    } catch (error) {
      console.error("Error fetching site data:", error);
    }
  };

  useEffect(() => {
    fetchyourSites();
    sendidtobackend();
  }, []);

  const tasks = [
    "Task 1: Review Site A's incident report.",
    "Task 2: Inspect Site B's camera setup.",
    "Task 3: Check progress of Site C.",
    "Task 4: Verify Site D's safety measures.",
    "Task 5: Prepare materials for Site E.",
    "Task 6: Review Site F's construction timeline.",
    "Task 7: Conduct safety drill at Site G.",
  ];

  const SampleNextArrow = ({ onClick }) => (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-yellow-500 z-10" onClick={onClick}>
      &rarr;
    </div>
  );

  const SamplePrevArrow = ({ onClick }) => (
    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-yellow-500 z-10" onClick={onClick}>
      &larr;
    </div>
  );

  const settings = {
    dots: true,
    infinite: Mysites.length > 1,
    speed: 500,
    slidesToShow: Mysites.length > 3 ? 3 : Mysites.length,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Mysites.length > 2 ? 2 : Mysites.length } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const [taskLimit, setTaskLimit] = useState();
  const [showMore, setShowMore] = useState(true);

  const handleShowMore = () => {
    setTaskLimit(taskLimit + 5);
    setShowMore(false);
  };

  const handleShowLess = () => {
    setTaskLimit(5);
    setShowMore(true);
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Incidents",
        data: [10, 20, 15, 25, 18, 30, 22],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Resolved Incidents",
        data: [5, 15, 10, 20, 15, 25, 18],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "New Anomalies",
        data: [2, 8, 5, 12, 9, 15, 10],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Incident Trends" },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(to bottom, #F59E0B, #FDE68A, #FEF3C7)",
        p: 4,
      }}
    >
      <Box
        sx={{
          p: 6,
          bgcolor: "rgba(255, 255, 255, 0.3)",
          borderRadius: 2,
          boxShadow: 3,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Welcome Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
            Welcome, Esteemed Supervisor!
          </Typography>
          <Typography
            variant="h6"
            fontFamily="Dancing Script"
            color="text.secondary"
          >
            Your expertise and leadership are truly making a difference. Keep up
            the amazing work!
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} mt={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <StatsCard
                title={stat.title}
                value={stat.value}
                color={stat.color}
              />
            </Grid>
          ))}
        </Grid>
  
        {/* Assigned Sites */}
        <Box className="container mx-auto p-6">
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Assigned Sites
          </Typography>
          <AssignedSiteCardList assignedSites={Mysites} />
        </Box>

        {/* Recent Alerts*/}
        <Box>
        <Typography variant="h5" fontWeight="bold" mb={2}>
            Recent Alerts
          </Typography>
        <AlertsSection />
        </Box>
  
        {/* Performance Section */}
        <Box mt={4}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Performance
          </Typography>
          <PerformanceChart />
        </Box>
  
      </Box>
    </Box>
  );

};

export default SupDash;
