import express from 'express'
import { adminLogin, logout, register, updateUser } from '../controllers/Admin/user.controller';

const router= express.Router()

router.post('/login',adminLogin);
router.post('/register',register);
router.post('/logout',logout);
router.put('/users/:id',updateUser);
router.delete('/users/:id');
router.get('/users/:id');
router.post('/addSubjects');
router.put('/subjects/:id');
router.delete('/subjects/:id');
router.get('/adminInfo');
router.get('/students');
router.get('/lecturers');
router.get('/subjects');
router.get('/grades');

export default router;
