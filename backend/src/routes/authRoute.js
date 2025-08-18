import express from 'express'
import { checkAuth, login, logout } from '../controllers/authController.js';
import {protectRoute} from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/login',login);
router.get('/checkAuth',protectRoute("admin","lecturer","student"),checkAuth)
router.post('/logout',logout)

export default router;