import express from "express";
const router = express.Router();
import {
  cancelAppointment,
  getPatientPreviousAssessments,
  getPatientProfile,
  postPatientAssessment,
  registerPatient,
} from "../controllers/patientController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/register").post(registerPatient);
router.route("/profile").get(protect, getPatientProfile);
router.route("/give-assessment").post(protect,postPatientAssessment)
router.route("/previous-assessments").get(protect,getPatientPreviousAssessments)
router.route("/cancel-appointment/:id").delete(protect,cancelAppointment)
export default router;
