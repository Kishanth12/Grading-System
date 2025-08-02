import express from 'express'
import { adminLogin, logout } from './../controllers/Admin/admin.controller.js';
import { register, updateUser } from './../controllers/Admin/user.controller.js';

const router= express.Router()

router.post('/login',adminLogin);
router.post('/register',register);
router.post('/logout',logout);
router.put('/update-users/:id',updateUser);
// router.delete('/users/:id');
// router.get('/users/:id');
// router.post('/addSubjects');
// router.put('/subjects/:id');
// router.delete('/subjects/:id');
// router.get('/adminInfo');
// router.get('/students');
// router.get('/lecturers');
// router.get('/subjects');
// router.get('/grades');

export default router;
