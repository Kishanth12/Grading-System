import express from 'express'
import {addLecturer, addStudent, adminLogin, deleteLecturer, deleteStudent, listLecturer, listStudents, logout, updateLecturer } from './../controllers/Admin/admin.controller.js';
import { register, updateUser } from './../controllers/Admin/user.controller.js';
import { addSubject, deleteSubject, editSubject, listGrade } from '../controllers/Admin/acadamic.controller.js';

const router= express.Router()

router.post('/login',adminLogin);
router.post('/register',register);
router.post('/logout',logout);
router.put('/update-users/:id',updateUser);
router.post('/students/:userId',addStudent)
router.post('/lecturer/:userId',addLecturer)
// router.delete('/admin/:id');
// router.get('/admin');
// router.get('/adminInfo');
router.get('/students',listStudents);
router.delete('/student/:id',deleteStudent)
router.put('/student/:id')
//router.get('/studentInfo/:id')
router.get('/lecturers',listLecturer);
router.delete('/lecturer/:id',deleteLecturer)
router.put('/lecturer/:id',updateLecturer)
//router.get('/LecturerInfo/:id')
router.get('/subjects');
router.post('/addSubjects',addSubject);
router.put('/subjects/:id',editSubject);
router.delete('/subjects/:id',deleteSubject);
router.get('/grades',listGrade);
//router.post('/finalGpa)

export default router;
