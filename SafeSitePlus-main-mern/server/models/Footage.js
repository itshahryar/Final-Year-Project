// const CameraSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//     },
//     site: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Site", // Reference to the Site schema
//     },
//     ipAddress: {
//       type: String, // If applicable, for IP-based cameras
//     },
//     location: {
//       type: String, // Specific location in the site, e.g., "Entrance Gate"
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive", "maintenance"],
//       default: "active",
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   });
// module.exports = mongoose.model("Camera", CameraSchema);


import mongoose from "mongoose";
  
  const FootageSchema = new mongoose.Schema({
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site", // Reference to the Site schema
      required: true,
    },
    location:{
              type: String, // Specific location in the site, e.g., "Entrance Gate"
            },
    status: {
        type: String,
        enum: ["active", "inactive", "maintenance"],
        default: "active",
            },
    // camera: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Camera", // Reference to the Camera schema
    // },

    // folderPath: {
    //   type: String,
    //   required: true, // Path to the folder containing footage
    // },
    fileName: {
      type: String, // Specific video file name
    },
    // timestamp: {
    //   type: Date,
    //   default: Date.now, // When the footage was recorded
    // },
    // description: {
    //   type: String,
    // },

  });
  
  module.exports = mongoose.model("Footage", FootageSchema);
  