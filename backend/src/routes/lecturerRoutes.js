import express from 'express'
import { login, profile } from './../controllers/Lecturers/lecturer.auth.controller';
import { assignedSubjects, infoStudents, listStudents } from './../controllers/Lecturers/lecturer.controllers';
import { addGrade, updateGrade } from './../controllers/Lecturers/grade.controller';
import { logout } from '../controllers/Admin/admin.controller';

const router = express.Router()

router.post('/login',login);
router.post('/logout',logout);
router.get('/profile',profile);
router.get('/students',listStudents);
router.get('/students/:id',infoStudents);
router.post('/grades',addGrade);
router.put('/grades/:id',updateGrade);
router.get('/subjects/assigned',assignedSubjects);



export default router