import express from "express";
import {
updateAnomalyResponse , deleteAlertAndResponse,sendEmailAlert,
saveID,
getAllincident
} from "../controllers/Incidents.js";

const router = express.Router();
router.post("/Updateresponse/:id" , updateAnomalyResponse)
router.post("/spam/:id" , deleteAlertAndResponse)
router.post("/saveID/:id",saveID)
router.get("/sendemailAlert" , sendEmailAlert)
router.get("/getAllincident" , getAllincident)


export default router;

