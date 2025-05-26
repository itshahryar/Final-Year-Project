import express from "express";
import {
  getAllWeatherData
} from "../controllers/Weather.js";

const router = express.Router();

router.get("/getAllWeatherData", getAllWeatherData); // Get all supervisors


export default router;

