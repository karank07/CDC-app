import express from 'express'
import { getNurseProfile, registerNurse } from '../controllers/nurseController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/',registerNurse)
router.route('/profile').get(protect,getNurseProfile)

export default router