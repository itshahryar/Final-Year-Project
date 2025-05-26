import { useEffect, useState } from "react";

const videoName = 'KAHUTTA.mp4'
const VideoStream = () => {
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    setStreamUrl(`http://localhost:8000/stream/${videoName}`);
  }, [videoName]);

  return (
    <div>
      <h2>Live Stream 1</h2>
      {/* <img src={streamUrl} alt="Live Stream" style={{ width: "100%", border: "2px solid black" }} /> */}
      <img src= {`http://localhost:8000/stream/stream1`} alt="Live Stream" style={{ width: "100%", border: "2px solid black" }} />
      <h2>Live Stream 2</h2>
      <img src={`http://localhost:8000/stream/stream2`} alt="Live Stream" style={{ width: "100%", border: "2px solid black" }} />
      {/* <h2>Live Stream 3</h2> */}
      {/* <img src={streamUrl} alt="Live Stream" style={{ width: "100%", border: "2px solid black" }} /> */}
    </div>
    
  );
};

export default VideoStream;
