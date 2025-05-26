// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

import footage from "@assets/Processedvideo.mp4"

// const FileViewer = () => {
//   const [loading, setLoading] = useState(true);  // To track if loading is complete

//   // useEffect(() => {
//   //   const fetchVideo = async () => {
//   //     try {
//   //       // Make a request to check if the video endpoint is accessible
//   //       const response = await axios.get('http://localhost:8000/embed-video');
//   //       if (response.status === 200) {
//   //         console.log('Video page loaded successfully');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching the video page:', error);
//   //     } finally {
//   //       setLoading(false);  // Stop loading indicator
//   //     }
//   //   };

//   //   fetchVideo();
//   // }, []);

//   // Display loading spinner or message while the data is being fetched
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Render the iframe to display the embedded video
//   return (
//     <div>
      
//       {/* <iframe
//         // src="http://localhost:8000/embed-video"
//         src={footage}
//         width="650"
//         height="400"
//         title="Embedded Video"
//         frameBorder="0"
//         allowFullScreen
//       /> */}
//     </div>
//   );
// };

// export default FileViewer;

import { useEffect, useRef } from 'react';

function VideoPlayer() {
  const cloudinaryRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if ( cloudinaryRef.current ) return;

    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: 'colbycloud-examples'
    })
  }, []);

  return (
      <video
        ref={videoRef}
      />
  );
}
