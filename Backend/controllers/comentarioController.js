import e from 'express';
import { comentarios } from '../models/modelSchemas.js';

export const nuevoComentario = async (req, res) => {
  try {
    const { user, comentario } = req.body;
    const newComment = new comentarios({ user, message });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el comentario' });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};

export default {
  createComment,
  getComments
};