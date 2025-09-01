import { Router } from 'express';
import auth from '../middleware/auth.js';
import { startExam, submitExam, getResult } from '../controllers/examController.js';
const router = Router();
router.post('/start', auth, startExam);
router.post('/submit', auth, submitExam);
router.get('/result/:id', auth, getResult);
export default router;
