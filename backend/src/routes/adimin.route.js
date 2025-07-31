import express from 'express'

const router= express.Router()

router.post('/login');
router.post('/signup');
router.post('/logout');
router.put('/update-profile');
router.post('/addUsers');
router.put('/users/:id');
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
