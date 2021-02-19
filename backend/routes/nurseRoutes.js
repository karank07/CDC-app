import express from 'express'
import { authNurse, getNurseProfile, registerNurse } from '../controllers/nurseController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/',registerNurse)
router.route('/login').post(authNurse)
router.route('/profile').get(protect,getNurseProfile)

export default router