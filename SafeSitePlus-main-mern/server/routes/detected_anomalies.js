import express from "express";
import {
    getDetectedAnomalies,getspecific
} from "../controllers/detected_anomalies.js";

const router = express.Router();
router.get("/detectedAnomalies" , getDetectedAnomalies)
// router.get("/detectedAnomalies:id" , getDetectedAnomalies) //isy id based krna sary alerts nahi
router.get("/specific/:id" , getspecific)

export default router;

