import express from 'express'

const router = express.Router()

router.post('/login');
router.post('/logout');
router.put('/update-profile');
router.get('/profile');
router.get('/students');
router.get('/students/:id');
router.get('/subjects');
router.post('/grades');
router.put('/grades/:id');
router.get('/subjects/assigned');



export default router