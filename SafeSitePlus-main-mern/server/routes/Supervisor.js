import express from "express";
import {
  getAllSupervisors,
  getSupervisorById,
  addSupervisor,
  deleteSupervisor,
  updateSupervisor,
  suspendSupervisor
} from "../controllers/Supervisor.js";

const router = express.Router();

router.get("/All", getAllSupervisors); // Get all supervisors
router.get("/supervisors/:id", getSupervisorById); // Get a specific supervisor by ID
router.post("/Register", addSupervisor); // Create a new supervisor
router.delete("/Delete/:id", deleteSupervisor); // Delete a supervisor by ID
router.put("/edit/:id", updateSupervisor); // Update a supervisor
router.put("/suspend/:id", suspendSupervisor);

export default router;

