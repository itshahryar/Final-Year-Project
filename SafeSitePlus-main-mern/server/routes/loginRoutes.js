

import express from "express";
import { loginvalidation } from "../middlewares/Signupmiddlware.js"; // Adjust path as needed
import { login,ForgetPass ,changedpass } from "../controllers/Login.js"; // Adjust path as needed
// import upload from "../middlewares/upload.js"; // Adjust path as needed

const router = express.Router();

// Define your routes
router.post('/:type/verify', loginvalidation, login);
router.post('/forget', ForgetPass);
// router.post('/PasswordChange',changedpass );
router.post('/PasswordChange/:id',changedpass );

// router.post('/uu', login2)
// router.post('/OTP',userLogin);
// router.post('/OTP/verify',verifyOTP);

// Export the router as default
export default router;


