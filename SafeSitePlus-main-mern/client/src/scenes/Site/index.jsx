// // import React from "react";
// // import lionVideo from "./lion5.mp4"; // Replace with the actual path to your video file

// // const Site = () => {

// //   const dispatch = useDispatch();
// //   const [Mysites , setMysites] = useState([]);

// //   // const UserId  = useSelector((state) => state.global.userId);
// //   const UserId  = '67571ca42734500f9170392d'
// //   const fetchyourSites = async () => {
// //     try {
// //       const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
// //       console.log("Response data:", response.data);
  
// //       // Transform the response data
// //       const allSites = response.data;

      
  
// //       const updatedSiteData = allSites.map((site) => ({
// //         SiteID: site._id,
// //         SiteName: site.SiteName ,// Use either `SiteName` or `name`
// //         SiteAddress: site.SiteAddress , // Use either `SiteAddress` or `address`
// //         City: site.City ,
// //         Sensitivity: site.Sensitivity , // Default value if `Sensitivity` is missing
// //         Active: site.Active  // Ensure `Active` is handled correctly
// //       }));
  
// //       // Update state
// //       setMysites(updatedSiteData);
// //       // console.log("Transformed Mysites:", updatedSiteData);
// //       console.log("All Mysite:", Mysites);
// //       console.log("All Mysite:", Mysites.length);
// //     } catch (error) {
// //       console.error("Error fetching site data:", error);
// //     }
// //   };
  
  



// // useEffect(() => {
 
// //     fetchyourSites();
// // }, []);


// //   const sites = [
// //     {
// //       id: 1,
// //       name: "Site A",
// //       description: "Construction site in downtown.",
// //       media: "https://via.placeholder.com/300",
// //       cameras: [
// //         {
// //           id: "C1",
// //           name: "Camera 1",
// //           status: "Active",
// //           media: lionVideo, // Video file path
// //           details: "Covers entrance area.",
// //         },
// //         {
// //           id: "C2",
// //           name: "Camera 2",
// //           status: "Inactive",
// //           media: lionVideo, // Video file path
// //           details: "Monitors parking lot.",
// //         },
// //         {
// //           id: "C3",
// //           name: "Camera 3",
// //           status: "Active",
// //           media: lionVideo, // Video file path
// //           details: "Overlooks the lobby.",
// //         },
// //         {
// //             id: "C4",
// //             name: "Camera 4",
// //             status: "Active",
// //             media: lionVideo, // Video file path
// //             details: "Overlooks the garage.",
// //           },
// //       ],
// //     },
// //     {
// //         id: 2,
// //         name: "Site B",
// //         description: "Construction site in school.",
// //         media: "https://via.placeholder.com/300",
// //         cameras: [
// //           {
// //             id: "C1",
// //             name: "Camera 1",
// //             status: "Active",
// //             media: lionVideo, // Video file path
// //             details: "Covers entrance area.",
// //           },
// //           {
// //             id: "C2",
// //             name: "Camera 2",
// //             status: "Inactive",
// //             media: lionVideo, // Video file path
// //             details: "Monitors parking lot.",
// //           },
// //           {
// //             id: "C3",
// //             name: "Camera 3",
// //             status: "Active",
// //             media: lionVideo, // Video file path
// //             details: "Overlooks the lobby.",
// //           },
// //           {
// //               id: "C4",
// //               name: "Camera 4",
// //               status: "Active",
// //               media: lionVideo, // Video file path
// //               details: "Overlooks the garage.",
// //             },
// //         ],
// //       },
// //   ];

// //   return (
// //     <div className="p-6 space-y-6 bg-gradient-to-b from-yellow-500 via-yellow-200 to-yellow-100 min-h-screen">
// //       <div className="text-center">
// //         <h1 className="text-4xl font-bold text-black">Supervisor Sites</h1>
// //         <p className="text-lg text-gray-700 mt-4">
// //           Manage all your assigned sites and monitor their cameras here!
// //         </p>
// //       </div>

// //       {sites.map((site) => (
// //         <div
// //           key={site.id}
// //           className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg p-6 mb-6"
// //         >
// //           <div className="text-center">
// //             <h2 className="text-3xl font-bold text-gray-800">{site.name}</h2>
// //             <p className="text-gray-600 mt-2">{site.description}</p>
// //             <img
// //               src={site.media}
// //               alt={site.name}
// //               className="rounded-lg w-full h-64 object-cover mt-4"
// //             />
// //           </div>

// //           <div className="mt-6">
// //             <h3 className="text-2xl font-bold text-gray-800 mb-4">
// //               Cameras in {site.name}
// //             </h3>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {site.cameras.map((camera) => (
// //                 <div
// //                   key={camera.id}
// //                   className="w-full bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow flex-shrink-0 relative"
// //                 >
// //                   {/* Status Label */}
// //                   <div
// //                     className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
// //                       camera.status === "Active"
// //                         ? "bg-green-500 text-white"
// //                         : "bg-red-500 text-white"
// //                     }`}
// //                   >
// //                     {camera.status}
// //                   </div>

// //                   {/* Media Section */}
// //                   <div className="cursor-pointer">
// //                     <video
// //                       src={camera.media}
// //                       className="w-full h-48 object-cover rounded-t-lg"
// //                       controls
// //                       muted
// //                     />
// //                   </div>

// //                   {/* Camera Details */}
// //                   <div className="px-4 pb-3">
// //                     <h4 className="text-lg font-semibold mt-2">{camera.name}</h4>
// //                     <p className="text-sm text-gray-600">{camera.details}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Site;

// import React, { useEffect, useState } from "react";
// import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// const Site = () => {
//   const [Mysites, setMysites] = useState([]);
//   const navigate = useNavigate();



//   const UserId = useSelector((state) => state.global.userId); // Replace with actual userId logic

//   const fetchYourSites = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
//       console.log("Response data:", response.data);

//       const allSites = response.data.map((site) => ({
//         SiteID: site._id,
//         SiteName: site.SiteName,
//         SiteAddress: site.SiteAddress,
//         City: site.City,
//         Sensitivity: site.Sensitivity || "Unknown",
//         Active: site.Active,
//         media: `http://localhost:8000/stream-video/${site.SiteName}.mp4`, // Keeping original API source
//       }));

//       setMysites(allSites);
//     } catch (error) {
//       console.error("Error fetching site data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchYourSites();
//   }, []);

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "linear-gradient(to bottom, #F59E0B, #FDE68A, #FEF3C7)", // Updated background
//         p: 4,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Box
//         sx={{
//           p: 6,
//           bgcolor: "rgba(255, 255, 255, 0.3)", // Translucent background
//           borderRadius: 2,
//           boxShadow: 3,
//           backdropFilter: "blur(10px)", // Blur effect
//           width: "100%",
//           maxWidth: "1200px", // Keeps content centered and responsive
//         }}
//       >
//                 {/* Welcome Section */}
//                 <Box textAlign="center" mb={4}>
//                   <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
//                   Supervisor Sites
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     fontFamily="Dancing Script"
//                     color="text.secondary"
//                   >
//                   Manage all your assigned sites and monitor their cameras here!
//                   </Typography>
//                 </Box>

//         {/* Dynamic Sites Mapping */}
//         {Mysites.map((site) => (
//           <Card
//             key={site.SiteID}
//             sx={{
//               mb: 4,
//               boxShadow: 3,
//               borderRadius: 2,
//               bgcolor: "rgba(255, 255, 255, 0.9)", // Light transparency
//               backdropFilter: "blur(10px)",
//               cursor: "pointer",
//             }}
//             onClick={() => navigate(`/listing/${site.SiteID}`)}
//           >
//             {/* Using <img> instead of <video> while keeping the original .mp4 API source */}
//             {/* <CardMedia
//               component="img"
//               height="250"
//               image={site.media}
//               alt={site.SiteName}
//               sx={{ borderRadius: "8px 8px 0 0" }}
//             /> */}

//             <Box>
//             <div className="h-[550px]">
//           {/* Camera Video Feed */}
//           {/* <img src="http://localhost:8000/stream-video/processed_indianworkers.mp4" /> */}
//           <img src={`http://localhost:8000/stream-video/${site.SiteName}.mp4`}/>
//           {/* <video
//             title="Camera View"
//             src={specificSite.media} // Video feed
//             className="w-full h-full"
//             controls
//           /> */}
//         </div>

//             </Box>

//             <CardContent sx={{ bgcolor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(5px)" }}>
//               <Typography variant="h5" fontWeight="bold" color="black">
//                 {site.SiteName}
//               </Typography>
//               <Typography variant="body1" color="black" mt={1}>
//                 Address: {site.SiteAddress} | City: {site.City}
//               </Typography>
//               <Typography variant="h6" fontWeight="bold" color="black" mt={2}>
//                 Sensitivity: {site.Sensitivity}
//               </Typography>
//               <Typography
//                 variant="body1"
//                 fontWeight="bold"
//                 sx={{ color: site.Active ? "green" : "red" }}
//               >
//                 Status: {site.Active ? "Active" : "Inactive"}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Site;

// import { useState, useEffect } from "react";
// import { Box, Typography, Card, CardContent, Select, MenuItem, TextField ,Button } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';

// const Site= () => {
//   const [allSites, setAllSites] = useState([]);
//   const [filteredSites, setFilteredSites] = useState([]);
//   const [filters, setFilters] = useState({
//     SiteName: "",
//     Active: "",
//     Sensitivity: "",
//   });
//   const UserId = useSelector((state) => state.global.userId);

//   const [SitenameCategory , setSitename] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:5000/Site/myAll/${UserId}`).then((response) => {
//       const sites = response.data.map((site) => ({
//         SiteID: site._id,
//         SiteName: site.SiteName,
//         SiteAddress: site.SiteAddress,
//         City: site.City,
//         Sensitivity: site.Sensitivity || "Unknown",
//         Active: site.Active,
//       }));
//       setAllSites(sites);
//       setFilteredSites(sites);
    
//     });
//   }, []);

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Apply filters
//   useEffect(() => {
//     let filtered = allSites;

//     if (filters.SiteName) {
//       filtered = filtered.filter((site) =>
//         site.SiteName.toLowerCase().includes(filters.SiteName.toLowerCase())
//       );
//     }
//     if (filters.Active) {
//       filtered = filtered.filter((site) => String(site.Active) === filters.Active);
//     }
//     if (filters.Sensitivity) {
//       filtered = filtered.filter((site) => site.Sensitivity === filters.Sensitivity);
//     }

//     setFilteredSites(filtered);
//   }, [filters, allSites]);

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "linear-gradient(to bottom, #F59E0B, #FDE68A, #FEF3C7)",
//         p: 4,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Box
//         sx={{
//           p: 6,
//           bgcolor: "rgba(255, 255, 255, 0.3)",
//           borderRadius: 2,
//           boxShadow: 3,
//           backdropFilter: "blur(10px)",
//           width: "100%",
//           maxWidth: "1200px",
//         }}
//       >
//         {/* Welcome Section */}
//         <Box textAlign="center" mb={4}>
//           <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
//             Supervisor Sites
//           </Typography>
//           <Typography variant="h6" fontFamily="Dancing Script" color="text.secondary">
//             Manage all your assigned sites and monitor their cameras here!
//           </Typography>
//         </Box>

// {filteredSites.map((sites, index) => (
// <Button
// key={index}
// // variant={selectedFilter === category ? "contained" : "outlined"}
// // color="primary"
// // sx={{
// // color: selectedFilter === category ? "#fff" : "#000",
// // bgcolor: selectedFilter === category ? "#00796b" : "transparent",
// // borderColor: "#00796b",
// // }}
// sx={{
//   color:  "#fff",
//   bgcolor:  "#00796b" ,
//   borderColor: "#00796b"
//   }}
//   name= "SiteName"

//   onClick={handleFilterChange}

// // onClick={() => setSelectedFilter(sites.SiteName)}
// >
// {sites.SiteName}
// </Button>
// ))}

//         {/* Filters Section */}
//         <Box display="flex" gap={2} mb={4}>
//           <TextField
//             label="Filter by Site Name"
//             name="SiteName"
//             variant="outlined"
//             fullWidth
//             value={filters.SiteName}
//             onChange={handleFilterChange}
//           />
//           <Select
//             name="Active"
//             value={filters.Active}
//             onChange={handleFilterChange}
//             displayEmpty
//             fullWidth
//           >
//             <MenuItem value="">Filter by Active</MenuItem>
//             <MenuItem value="true">Active</MenuItem>
//             <MenuItem value="false">Inactive</MenuItem>
//           </Select>
//           <Select
//             name="Sensitivity"
//             value={filters.Sensitivity}
//             onChange={handleFilterChange}
//             displayEmpty
//             fullWidth
//           >
//             <MenuItem value="">Filter by Sensitivity</MenuItem>
//             <MenuItem value="High">High</MenuItem>
//             <MenuItem value="Medium">Medium</MenuItem>
//             <MenuItem value="Low">Low</MenuItem>
//             <MenuItem value="Unknown">Unknown</MenuItem>
//           </Select>
//         </Box>

//         {/* Dynamic Sites Mapping */}
//         {filteredSites.map((site) => (
//           <Card
//             key={site.SiteID}
//             sx={{
//               mb: 4,
//               boxShadow: 3,
//               borderRadius: 2,
//               bgcolor: "rgba(255, 255, 255, 0.9)",
//               backdropFilter: "blur(10px)",
//               cursor: "pointer",
//             }}
//             onClick={() => navigate(`/listing/${site.SiteID}`)}
//           >
//             <Box>
//               <div className="h-[550px]">
//                 <img src={`http://localhost:8000/stream-video/${site.SiteName}.mp4`} alt={site.SiteName} />
//               </div>
//             </Box>

//             <CardContent sx={{ bgcolor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(5px)" }}>
//               <Typography variant="h5" fontWeight="bold" color="black">
//                 {site.SiteName}
//               </Typography>
//               <Typography variant="body1" color="black" mt={1}>
//                 Address: {site.SiteAddress} | City: {site.City}
//               </Typography>
//               <Typography variant="h6" fontWeight="bold" color="black" mt={2}>
//                 Sensitivity: {site.Sensitivity}
//               </Typography>
//               <Typography
//                 variant="body1"
//                 fontWeight="bold"
//                 sx={{ color: site.Active ? "green" : "red" }}
//               >
//                 Status: {site.Active ? "Active" : "Inactive"}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Site;

import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Select, MenuItem, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Site = () => {
  const [allSites, setAllSites] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [filters, setFilters] = useState({
    SiteName: "",
    Active: "",
    Sensitivity: "",
  });
  const UserId = useSelector((state) => state.global.userId);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/Site/myAll/${UserId}`).then((response) => {
      const sites = response.data.map((site) => ({
        SiteID: site._id,
        SiteName: site.SiteName,
        SiteAddress: site.SiteAddress,
        City: site.City,
        Sensitivity: site.Sensitivity || "Unknown",
        Active: site.Active,
      }));
      setAllSites(sites);
      setFilteredSites(sites);
    });
  }, [UserId]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle button click to filter by SiteName
  const handleButtonClick = (siteName) => {
    setFilters((prev) => ({ ...prev, SiteName: siteName }));
  };

  // Apply filters
  useEffect(() => {
    let filtered = allSites;

    if (filters.SiteName) {
      filtered = filtered.filter((site) =>
        site.SiteName.toLowerCase().includes(filters.SiteName.toLowerCase())
      );
    }
    if (filters.Active) {
      filtered = filtered.filter((site) => String(site.Active) === filters.Active);
    }
    if (filters.Sensitivity) {
      filtered = filtered.filter((site) => site.Sensitivity === filters.Sensitivity);
    }

    setFilteredSites(filtered);
  }, [filters, allSites]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(to bottom, #F59E0B, #FDE68A, #FEF3C7)",
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: 6,
          bgcolor: "rgba(255, 255, 255, 0.3)",
          borderRadius: 2,
          boxShadow: 3,
          backdropFilter: "blur(10px)",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Welcome Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
            Supervisor Sites
          </Typography>
          <Typography variant="h6" fontFamily="Dancing Script" color="text.secondary">
            Manage all your assigned sites and monitor their cameras here!
          </Typography>
        </Box>

        {/* Site Name Buttons */}

        <Box
        sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        mb: 3,
        p: 2,
        bgcolor: "#e0f2f1",
        borderRadius: 2,
        }}>
        <Box display="flex" gap={2} mb={4} flexWrap="wrap">
          {/* "All" Button */}
          <Button
            variant={filters.SiteName === "" ? "contained" : "outlined"}
            color="primary"
            sx={{
              color: filters.SiteName === "" ? "#fff" : "#000",
              bgcolor: filters.SiteName === "" ? "#00796b" : "transparent",
              // color: filters.SiteName === "" ? "#fff" : ""#000",
              // bgcolor: filters.SiteName === "" ? "#00796b" : "transparent",
              borderColor: "#00796b",
              "&:hover": {
                bgcolor: filters.SiteName === "" ? "#00796b" : "#e0f2f1",
              },
            }}
            onClick={() => handleButtonClick("")}
          >
            All
          </Button>
          </Box>

          {/* Site Name Buttons */}
          {allSites.map((site, index) => (
            <Button
              key={index}
              variant={filters.SiteName === site.SiteName ? "contained" : "outlined"}
              color="primary"
              sx={{
                color: filters.SiteName === site.SiteName ? "#fff" : "#00796b",
                bgcolor: filters.SiteName === site.SiteName ? "#00796b" : "transparent",
                borderColor: "#00796b",
                "&:hover": {
                  bgcolor: filters.SiteName === site.SiteName ? "#00796b" : "#e0f2f1",
                },
              }}
              onClick={() => handleButtonClick(site.SiteName)}
            >
              {site.SiteName}
            </Button>
          ))}
        </Box>

        {/* Filters Section */}
        <Box display="flex" gap={2} mb={4}>
          <Select
            name="Active"
            value={filters.Active}
            onChange={handleFilterChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">Filter by Active</MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </Select>
          <Select
            name="Sensitivity"
            value={filters.Sensitivity}
            onChange={handleFilterChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">Filter by Sensitivity</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Unknown">Unknown</MenuItem>
          </Select>
        </Box>

        {/* Dynamic Sites Mapping */}
        {filteredSites.map((site) => (
          <Card
            key={site.SiteID}
            sx={{
              mb: 4,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/listing/${site.SiteID}`)}
          >
            <Box>
              <div className="h-[550px]">
                <img src={`http://localhost:8000/stream-video/${site.SiteName}.mp4`} alt={site.SiteName} />
              </div>
            </Box>

            <CardContent sx={{ bgcolor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(5px)" }}>
              <Typography variant="h5" fontWeight="bold" color="black">
                {site.SiteName}
              </Typography>
              <Typography variant="body1" color="black" mt={1}>
                Address: {site.SiteAddress} | City: {site.City}
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="black" mt={2}>
                Sensitivity: {site.Sensitivity}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ color: site.Active ? "green" : "red" }}
              >
                Status: {site.Active ? "Active" : "Inactive"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Site;
