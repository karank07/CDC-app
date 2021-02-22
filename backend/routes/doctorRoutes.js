import express from 'express'
import { registerDoctor } from '../controllers/doctorController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/',registerDoctor)
// router.route('/profile').get(protect,getNurseProfile)

export default router