import express from 'express'
const router = express.Router()
import {authPatient, getPatientProfile, registerPatient} from '../controllers/patientController.js'
import { protectPatient } from '../middleware/authMiddleware.js'

router.post('/',registerPatient)
router.post('/login', authPatient)
router.route('/profile').get(protectPatient,getPatientProfile)

export default router