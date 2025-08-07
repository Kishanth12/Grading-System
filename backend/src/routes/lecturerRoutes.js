import express from 'express'
import { login } from './../controllers/Lecturers/lecturer.auth.controller';
import { infoStudents, listStudents } from './../controllers/Lecturers/lecturer.controllers';
import { addGrade } from './../controllers/Lecturers/grade.controller';
import { logout } from '../controllers/Admin/admin.controller';

const router = express.Router()

router.post('/login',login);
router.post('/logout',logout);
// router.get('/profile');
router.get('/students',listStudents);
router.get('/students/:id',infoStudents);
// router.get('/subjects');
router.post('/grades',addGrade);
// router.put('/grades/:id');
// router.get('/subjects/assigned');



export default router