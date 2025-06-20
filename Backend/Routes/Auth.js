import express from 'express';
import { crearUsuario, loginUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.post("/login", loginUsuario);
router.post("/usuarios", crearUsuario);

export default router;
