import express from 'express'
import { updateNurseProfile, registerNurse, getAssessmentsToReview, reviewAssessment, scheduleAppointment, getPatientList } from '../controllers/nurseController.js'
import { nurseAdmin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/register',registerNurse)
router.route('/profile').put(protect,updateNurseProfile)
router.route("/assessments-for-review").get(protect, nurseAdmin, getAssessmentsToReview)
router.route("/patient-list").get(protect, nurseAdmin, getPatientList)
router.route("/review-assessment/:id").post(protect, nurseAdmin, reviewAssessment)
router.route("/schedule-appointment/:id").post(protect, nurseAdmin, scheduleAppointment)


export default router