import AnomalyResponse from "../models/Incidents.js";

import DetectedAnomaly from "../models/detected_anomalies.js"; // Your alert model

import Supervisor from "../models/Supervisor.js"; 
import nodemailer from 'nodemailer';

export const deleteAlertAndResponse = async (req, res) => {
  try {
    const { id } = req.params; // Alert ID

    // Delete the response entry related to this anomaly
    await AnomalyResponse.deleteOne({ anomalyId: id });

    // Delete the detected anomaly itself
    const deletedAlert = await DetectedAnomaly.findByIdAndDelete(id);

    if (!deletedAlert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.json({
      message: "Alert and related response deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting alert:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Update Response Details & Status
export const updateAnomalyResponse = async (req, res) => {
    console.log("abhi response nikal aye ga ")
  try {
    const { responseDetails, status } = req.body;
    const { id } = req.params; // AnomalyResponse ID

    // Find the response entry
    const anomalyResponse = await AnomalyResponse.findOne({ anomalyId: id });
    console.log("hn iska response change ho jaye ga" + anomalyResponse);
    if (!anomalyResponse) {
      return res.status(404).json({ message: "Anomaly response not found" });
    }

    // Calculate response time (difference between now and creation)
    if (!anomalyResponse.responseTime) {
      anomalyResponse.responseTime = new Date() - anomalyResponse._id.getTimestamp();
    }

    // Update details
    anomalyResponse.responseDetails = responseDetails || anomalyResponse.responseDetails;
    anomalyResponse.status = status || anomalyResponse.status;

    // If marked as "Resolved", set resolvedAt timestamp
    if (status === "Resolved") {
      anomalyResponse.resolvedAt = new Date();
    }

    // Save updated document
    await anomalyResponse.save();
    res.status(200).json({ message: "Anomaly response updated successfully", anomalyResponse });
  } catch (error) {
    console.error("Error updating anomaly response:", error);
    res.status(500).json({ message: "Server error" });
  }
};

let supervisorId = null

export const saveID = async(req,res)=>{
  console.log("abhi ID save ho jaye gi");
  supervisorId = req.params.id
 
  res.json({ message: 'UserID stored successfully' });

}


export const getAllincident = async (req, res) => {
  try {
    console.log("abhi ajain gy");
    const anomalies = await AnomalyResponse.find().sort({ detectedAt: -1 }); // Latest first
    res.status(200).json(anomalies);
  } catch (error) {
    console.error('Error fetching detected anomalies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendEmailAlert = async (req,res) => {
  console.log("gg ye wala chal jaye ga");
  console.log(supervisorId + "ye id hy ");
  try {
      // Step 1: Get all unresolved anomaly responses
      const unresolvedAnomalies = await AnomalyResponse.find({ status: "Unresolved" });

      if (!unresolvedAnomalies.length) {
          console.log("✅ No unresolved anomalies found.");
          return;
      }

      // Step 2: Fetch detected anomalies using anomalyId from AnomalyResponse
      const anomalyIds = unresolvedAnomalies.map(anomaly => anomaly.anomalyId);
      const detectedAnomalies = await DetectedAnomaly.find({ _id: { $in: anomalyIds } });

      if (!detectedAnomalies.length) {
          console.log("⚠️ No detected anomalies found for unresolved cases.");
          return;
      }

      // Step 3: Get Supervisor Details
      const supervisor = await Supervisor.findById(supervisorId);

      if (!supervisor || !supervisor.alternateEmail) {
          console.log("⚠️ Supervisor or alternate email not found.");
          return;
      }

      // Construct email content
      const emailContent = detectedAnomalies.map(anomaly =>
          `📍 Site ID: ${anomaly.siteId}\n` +
          `🔍 Description: ${anomaly.description}\n` +
          `🕒 Detected At: ${new Date(anomaly.detectedAt).toLocaleString()}\n`
      ).join("\n----------------------\n");

      // Step 4: Send Email Alert
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: 'zaminraza095@gmail.com',
            pass: 'svtu pbaj nppi ynkf',
          }
      });

      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: supervisor.alternateEmail,
          subject: "🚨 Unresolved Anomalies Alert - Immediate Action Required",
          text: `Dear ${supervisor.name},\n\nThe following anomalies remain unresolved:\n\n${emailContent}\n\nPlease take immediate action.\n\nBest Regards,\nSafety Monitoring System`
      };

      await transporter.sendMail(mailOptions);
      console.log(`📧 Alert sent to ${supervisor.alternateEmail}`);

  } catch (error) {
      console.error("❌ Error sending alert:", error);
  }
};


