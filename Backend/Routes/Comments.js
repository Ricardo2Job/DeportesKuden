import express from 'express';
const router = express.Router();
import comentarioController from '../controllers/comentarioController.js';

router.post('/comments', comentarioController.crearComentario);
router.get('/comments', comentarioController.getComentarios);

export default router;
