import express from 'express';
const router = express.Router();
import comentarioController from '../controllers/comentarioController.js';

router.post('/comments', comentarioController.createComment);
router.get('/comments', comentarioController.getComments);

export default router;
