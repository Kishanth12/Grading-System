import express from 'express'
import {addLecturer, addStudent, deleteLecturer, deleteStudent, listLecturer, listStudents, updateLecturer, updateStudent } from './../controllers/Admin/admin.controller.js';
import { adminInfo, lecturerInfo, register, studentInfo, updateUser } from './../controllers/Admin/user.controller.js';
import { addSubject, deleteSubject, editSubject, listGrade, listSubject, totalGpa } from '../controllers/Admin/academic.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import upload from './../middleware/multer.js';


const router= express.Router()

//auth
router.post('/register',upload.single("profilePic"),register);//protectRoute("admin")

//admin
router.put('/update-users/:id',protectRoute("admin"),updateUser);
// router.delete('/admin/:id');
// router.get('/admin');
router.get('/adminInfo',protectRoute("admin"),adminInfo);


//student
router.post('/students/:userId',addStudent)//protectRoute("admin")
router.get('/students',listStudents);//,protectRoute("admin")
router.delete('/student/:id',protectRoute("admin"),deleteStudent)
router.put('/student/:id',protectRoute("admin"),updateStudent)
router.get('/studentInfo/:id',studentInfo)//,protectRoute("admin")


//lecturer
router.post('/lecturer/:userId',addLecturer)//protectRoute("admin")
router.get('/lecturers',listLecturer);//,protectRoute("admin")
router.delete('/lecturer/:id',protectRoute("admin"),deleteLecturer)
router.put('/lecturer/:id',protectRoute("admin"),updateLecturer)
router.get('/lecturerInfo/:id',lecturerInfo)//,protectRoute("admin"),


//subjects
router.post('/addSubjects',addSubject);//,protectRoute("admin")
router.get('/subjects',listSubject);//,protectRoute("admin")
router.put('/subjects/:id',protectRoute("admin"),editSubject);
router.delete('/subjects/:id',protectRoute("admin"),deleteSubject);

//grades
router.get('/grades',protectRoute("admin"),listGrade);
router.post('/finalGpa',protectRoute("admin"),totalGpa)

export default router;
