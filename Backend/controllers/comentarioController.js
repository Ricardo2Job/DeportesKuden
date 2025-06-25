import { Comentarios } from '../models/modelSchemas.js';

export const crearComentario = async (req, res) => {
  try {
    const { comentario, etiqueta, usuario } = req.body;

    const nuevoComentario = new Comentarios({
      comentario,
      etiqueta,
      usuario  // este debe ser el _id del usuario
    });

    const guardado = await nuevoComentario.save();
    res.status(201).json({ mensaje: 'Comentario creado', comentario: guardado });
  } catch (error) {
    throw new Error('Error al crear comentario:', error);
  }
};

export const getComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find()
      .populate('usuario', 'nombre email') // opcional: ajusta campos
      .sort({ fecha: -1 });

    res.status(200).json(comentarios);
  } catch (error) {
    throw new Error('Error al obtener comentarios:', error);
  }
};

export default {
  crearComentario,
  getComentarios
};