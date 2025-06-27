import { Comentarios } from '../models/modelSchemas.js';
import { resolvers } from '../schemas/resolvers.js';
const getUsuarioByNombre = resolvers.Query.getUsuarioByNombre; // Asegúrate de que este método esté definido en tus resolvers

export const crearComentario = async (req, res) => {
  try {
    const { comentario, etiqueta, usuario } = req.body;

    const usuarioID = await getUsuarioByNombre(null, {nombre: usuario}) // Asegúrate de que usuario sea un objeto con _id
    const nuevoComentario = new Comentarios({
      comentario,
      etiqueta,
      usuario : usuarioID  // este debe ser el _id del usuario
    });
    await nuevoComentario.save();
    res.status(201).json({ mensaje: 'Comentario creado'});
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