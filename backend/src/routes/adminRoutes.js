import express from 'express'
import {addLecturer, addStudent, deleteLecturer, deleteStudent, listLecturer, listStudents, updateLecturer, updateStudent } from './../controllers/Admin/admin.controller.js';
import { adminInfo, lecturerInfo, register, studentInfo, updateUser } from './../controllers/Admin/user.controller.js';
import { addSubject, deleteSubject, editSubject, listGrade, listSubject, totalGpa } from '../controllers/Admin/academic.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import upload from './../middleware/multer.js';


const router= express.Router()

//auth
router.post('/register',protectRoute("admin"),upload.single("profilePic"),register);//

//admin
router.put('/update-users/:id',protectRoute("admin"),updateUser);
// router.delete('/admin/:id');
// router.get('/admin');
router.get('/adminInfo',protectRoute("admin"),adminInfo);


//student
router.post('/students/:userId',protectRoute("admin"),addStudent)//
router.get('/students',protectRoute("admin"),listStudents);//
router.delete('/student/:id',protectRoute("admin"),deleteStudent)
router.put('/student/:id',protectRoute("admin"),updateStudent)
router.get('/studentInfo/:id',protectRoute("admin"),studentInfo)//


//lecturer
router.post('/lecturer/:userId',protectRoute("admin"),addLecturer)//
router.get('/lecturers',protectRoute("admin"),listLecturer);//
router.delete('/lecturer/:id',protectRoute("admin"),deleteLecturer)
router.put('/lecturer/:id',protectRoute("admin"),updateLecturer)
router.get('/lecturerInfo/:id',protectRoute("admin"),lecturerInfo)//


//subjects
router.post('/addSubjects',protectRoute("admin"),addSubject);//
router.get('/subjects',protectRoute("admin"),listSubject);//
router.put('/subjects/:id',protectRoute("admin"),editSubject);
router.delete('/subjects/:id',protectRoute("admin"),deleteSubject);

//grades
router.get('/grades',protectRoute("admin"),listGrade);
router.post('/finalGpa',protectRoute("admin"),totalGpa)

export default router;
