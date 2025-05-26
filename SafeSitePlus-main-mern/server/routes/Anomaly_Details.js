import express from "express";
import {
  SeeAll,
  UpdateAnomaly
} from "../controllers/Anomaly_Detect.js";

const router = express.Router();
router.get("/SeeAnomalyinfo" , SeeAll)
router.put("/SetAnoamly", UpdateAnomaly); // Get all supervisors


export default router;

