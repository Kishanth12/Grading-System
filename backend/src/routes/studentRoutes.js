import express from 'express'
import { login } from './../controllers/Students/studentAuth.controller.js';

const router = express.Router()

router.post('/login',login);
// router.get('/profile');
// router.get('/grades');
// router.get('/subjects');
// router.get('/grades/:subjectId');



export default router