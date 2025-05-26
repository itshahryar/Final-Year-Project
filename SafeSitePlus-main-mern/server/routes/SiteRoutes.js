import express from "express";
import {
 addSite,
 getAllSites,
 myAllsites,
 SetActive,
 SpecificSite,
 updateSite
 

} from "../controllers/Sites.js";

const router = express.Router();

router.get("/All", getAllSites); // Get all supervisors
router.get("/SetActive", SetActive); // Get all supervisors
// router.get("/myAll/:UserId", myAllsites); 
router.get('/myAll/:UserId', myAllsites);
router.get('/SpecificSite/:id', SpecificSite);
router.put('/Update/:id',updateSite)
// Get all supervisors
// router.get("/supervisors/:id", getSupervisorById); // Get a specific supervisor by ID
router.post("/Register", addSite); // Create a new supervisor
// router.delete("/Delete/:id", deleteSupervisor); // Delete a supervisor by ID
// router.put("/edit/:id", updateSupervisor); // Update a supervisor

export default router;

