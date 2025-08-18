import express from 'express'
import { login, profile } from './../controllers/Lecturers/lecturer.auth.controller.js';
import { assignedSubjects, getStudentSubjects, infoStudents, listStudents } from './../controllers/Lecturers/lecturer.controllers.js';
import { addGrade, updateGrade } from './../controllers/Lecturers/grade.controller.js';
import { protectRoute } from './../middleware/auth.middleware.js';

const router = express.Router()

router.post('/login',login);
router.get('/profile',protectRoute("lecturer"),profile);
router.get('/students',protectRoute("lecturer"),listStudents);
router.get('/students/:id',protectRoute("lecturer"),infoStudents);
router.post('/addGrade',addGrade);//,protectRoute("lecturer")
router.get('/studentSub',getStudentSubjects)
router.put('/grades/:id',protectRoute("lecturer"),updateGrade);
router.get('/subjects/assigned',protectRoute("lecturer"),assignedSubjects);



export default router