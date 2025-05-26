
import React, { useEffect, useState } from "react";
import footage from "@assets/Processedvideo.mp4";

const Video = () => {
    // const [videoUrl, setVideoUrl] = useState("");
 


    // useEffect(() => {
        // Send request to process video
        // const processVideo = async () => {
            // setVideoUrl(`http://localhost:8000/output/processed_indianworkers.mp4`);
            // setVideoUrl(`http://localhost:8000/output/processed_indianworkers.mp4`);
        //     try {
        //         const response = await fetch("http://localhost:8000/process-video");
        //         const data = await response.json();

        //         if (response.ok) {
        //             console.log("Processed video URL:", data.outputVideoPath);
        //             setVideoUrl(`http://localhost:8000${data.outputVideoPath}`);
        //         } else {
        //             console.error("Error processing video:", data.detail);
        //         }
        //     } catch (error) {
        //         console.error("Error fetching video:", error);
        //     }
    //     };

    //     processVideo();
    // }, []);

    return (
        <div>
                        {/* <video controls width="600">
        //             <source src={footage} type="video/mp4" />
        //             Your browser does not support the video tag. */}
        {/* //         </video> */}

        <img src="http://localhost:8000/stream-video/processed_indianworkers.mp4" />


        </div>
        // <div>
        //     {videoUrl ? (
        //         <video controls width="600">
        //             <source src={footage} type="video/mp4" />
        //             Your browser does not support the video tag.
        //         </video>
        //     ) : (
        //         <p>Processing video, please wait...</p>
        //     )}
        // </div>
    );
};
export default Video;

