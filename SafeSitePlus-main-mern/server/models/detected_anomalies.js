import mongoose from "mongoose";

const detectedAnomalySchema = new mongoose.Schema({
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site', // Reference to Site collection if applicable
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  detectedAt: {
    type: Date,
    default: Date.now,
  },
  Seen:{
    type: Boolean,
    default: false
  }
},{ timestamps: true });




const DetectedAnomaly = mongoose.model("DetectedAnomaly", detectedAnomalySchema);

export default DetectedAnomaly;


