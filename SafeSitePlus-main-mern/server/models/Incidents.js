import mongoose from "mongoose";

const anomalyResponseSchema = new mongoose.Schema({
  anomalyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "detectedanomalies", // Reference to detected anomalies collection
    required: true,
  },
  responseTime: {
    type: Date,
    default: null, // Initially null, updated when responded
  },
  responseDetails: {
    type: String,
    default: null, // Optional field for response description
  },
  status: {
    type: String,
    enum: ["Unresolved", "In Progress", "Resolved"],
    default: "Unresolved", // Default status when created
  },
  resolvedAt: {
    type: Date,
    default: null, // Stores timestamp when status is changed to "Resolved"
  },
},{ timestamps: true });

// Create Model
const AnomalyResponse = mongoose.model("AnomalyResponse", anomalyResponseSchema);

export default AnomalyResponse;

