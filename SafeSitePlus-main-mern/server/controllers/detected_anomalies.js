
import DetectedAnomaly from "../models/detected_anomalies.js"; 


export const getDetectedAnomalies = async (req, res) => {
  try {
    console.log("abhi ajain gy");
    const anomalies = await DetectedAnomaly.find().sort({ detectedAt: -1 }); // Latest first
    console.log(anomalies)
    res.status(200).json(anomalies);
  } catch (error) {
    console.error('Error fetching detected anomalies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getspecific = async (req, res) => {
  try {
    console.log("abhi specific ajaye gi")
    const { id } = req.params;
    const anomaly = await DetectedAnomaly.findById(id);
    // anomaly.Seen= true

    if (!anomaly) {
      return res.status(404).json({ message: "Anomaly not found" });
    }

    res.status(200).json(anomaly);
  } catch (error) {
    console.error("Error fetching anomaly:", error);
    res.status(500).json({ message: "Server error" });
  }
};
