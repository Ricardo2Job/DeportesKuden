const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');

router.post('/comments', comentarioController.createComment);
router.get('/comments', comentarioController.getComments);

module.exports = router;
