import express from "express";
const router = express.Router();
import {
  getListOfPatients,
  getPatientPreviousAssessments,
  getPatientProfile,
  postPatientAssessment,
  registerPatient,
} from "../controllers/patientController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerPatient);
router.route("/listForReview").get(protect, admin, getListOfPatients)
router.route("/profile").get(protect, getPatientProfile);
router.route("/:id/assessment").post(protect,postPatientAssessment).get(protect,getPatientPreviousAssessments)
export default router;
