// import { number } from "joi";
import mongoose from "mongoose";

const anomalySchema = new mongoose.Schema({
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site", // Reference to the Site schema
    required: true,
  },
  detectionRequirements: {
    Hardhat: { type: Boolean, default: true },
    SafetyVests: { type: Boolean, default: true },
    max_persons: { type: Number, default: 4 },
    gloves: { type: Boolean, default: false },
    safetyBoots: { type: Boolean, default: false },
    faceShield: { type: Boolean, default: false },
    otherPPE: { type: Boolean, default: false },
  },
},
{ timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

const Anomaly_Details = mongoose.model("Anomaly_Details", anomalySchema);

export default Anomaly_Details;
