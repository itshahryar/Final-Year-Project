// import React from "react";
// // Importing the video file
// import lionVideo from "./lion5.mp4"; // Adjust the path as needed

// const AssignedSiteCard = ({ site }) => {
//   const isOnline = site.status === "online"; // Determine site status

//   return (
//     <div className="w-50 mx-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow flex-shrink-0 relative">
//       {/* Status Label */}
//       <div
//         className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
//           isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white"
//         }`}
//       >
//         {isOnline ? "Online" : "Offline"}
//       </div>

//       {/* Media Section (Video Instead of Image) */}
//       <div
//         className="cursor-pointer"
//         onClick={() => (window.location.href = `/site/${site.id}`)}
//       >
//         {/* <img src="http://localhost:80000/stream-video/processed_video.mp4" /> */}

//         <video
//            src={'http://localhost:80000/stream-video/processed_video.mp4'} 
          
//           alt={site.name}
//           className="w-full h-48 object-cover"
//           controls // Optional, if you want video controls
//           autoPlay // Optional, if you want it to autoplay
//           muted // Optional, if you want to mute the video
//         />
//       </div>

//       {/* Site Details */}
//       <div className="px-4 pb-3">
//         <h4 className="text-lg font-semibold mt-2">{site.name}</h4>
//         <p className="text-sm text-gray-600">{site.description}</p>
//       </div>
//     </div>
//   );
// };

// export default AssignedSiteCard;

// import React from "react";

// const AssignedSiteCard = ({ site }) => {
//   console.log("Site details in AssignedSiteCard:", site);
//   const isOnline = site.Active === true; 
  
//   console.log(isOnline)// Determine site status

//   console.log(site.Active + "Active")

//   return (
//     <div className="w-50 mx-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow flex-shrink-0 relative">
//       {/* Status Label */}
//       <div
//         className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
//           isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white"
//         }`}
//       >
//         {isOnline ? "Online" : "Offline"}
//       </div>

//       {/* Media Section (Video Instead of Image) */}
//       <div
//         className="cursor-pointer"
//         onClick={() => (window.location.href = `/site/${site._id}`)}

         
//         >
//         {/* <video
//           // src={`http://localhost:8000/stream-video/${site.videoId}`} // Replace with FastAPI stream route
//           src={`http://localhost:8000/stream-video/processed_indianworkers`} // Replace with FastAPI stream route
//           className="w-full h-48 object-cover"
//           controls // Optional, if you want video controls
//           autoPlay // Optional, for autoplay
//           muted // Optional, to mute the video
//         /> */}
//         <img src={`http://localhost:8000/stream-video/${site?.SiteName}.mp4`} alt="Site Video" />

        
//         {/* <img src="http://localhost:8000/stream-video/processed_indianworkers.mp4" /> */}
      
//       </div>

//       {/* Site Details */}
//       <div className="px-4 pb-3">
//         <h4 className="text-lg font-semibold mt-2">{site.SiteName}</h4>
//         <p className="text-sm text-blue-600">{site.City}</p>
//       </div>
//     </div>
//   );
// };

// export default AssignedSiteCard;

import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const AssignedSiteCard = ({ site }) => {
  const isOnline = site.Active === true;

  return (
    <Card sx={{ width: 300, position: "relative", boxShadow: 3, borderRadius: 2 }}>
      {/* Status Label */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          px: 2,
          py: 0.5,
          borderRadius: "16px",
          fontSize: "0.8rem",
          fontWeight: "bold",
          bgcolor: isOnline ? "green" : "red",
          color: "white",
        }}
      >
        {isOnline ? "Active" : "Closed"}
      </Box>

      {/* Video Section */}
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:8000/stream-video/${site?.SiteName}.mp4`}
        alt="Site Video"
        onClick={() => (window.location.href = `/site/${site._id}`)}
        sx={{ cursor: "pointer" }}
      />

      {/* Site Details */}
      <CardContent>
        <Typography variant="h6">{site.SiteName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {site.City}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AssignedSiteCard;
