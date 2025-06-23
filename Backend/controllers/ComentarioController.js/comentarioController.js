const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { user, message } = req.body;
    const newComment = new Comment({ user, message });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el comentario' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};
