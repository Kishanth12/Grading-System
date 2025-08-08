import express from 'express'
import {addLecturer, addStudent, adminLogin, deleteLecturer, deleteStudent, listLecturer, listStudents, logout, updateLecturer, updateStudent } from './../controllers/Admin/admin.controller.js';
import { adminInfo, lecturerInfo, register, studentInfo, updateUser } from './../controllers/Admin/user.controller.js';
import { addSubject, deleteSubject, editSubject, listGrade, listSubject, totalGpa } from '../controllers/Admin/academic.controller.js';

const router= express.Router()

router.post('/login',adminLogin);
router.post('/register',register);
router.post('/logout',logout);
router.put('/update-users/:id',updateUser);
router.post('/students/:userId',addStudent)
router.post('/lecturer/:userId',addLecturer)
// router.delete('/admin/:id');
// router.get('/admin');
router.get('/adminInfo',adminInfo);//middleware need
router.get('/students',listStudents);
router.delete('/student/:id',deleteStudent)
router.put('/student/:id',updateStudent)
router.get('/studentInfo/:id',studentInfo)
router.get('/lecturers',listLecturer);
router.delete('/lecturer/:id',deleteLecturer)
router.put('/lecturer/:id',updateLecturer)
router.get('/LecturerInfo/:id',lecturerInfo)
router.get('/subjects',listSubject);
router.post('/addSubjects',addSubject);
router.put('/subjects/:id',editSubject);
router.delete('/subjects/:id',deleteSubject);
router.get('/grades',listGrade);
router.post('/finalGpa',totalGpa)

export default router;
