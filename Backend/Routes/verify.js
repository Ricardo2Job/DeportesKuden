const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.get('/verificar', async (req, res) => {
  const { token } = req.query;

  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send('❌ Usuario no encontrado.');
    }

    // Marca el correo como verificado
    user.emailVerified = true;
    await user.save();

    res.send('✅ ¡Correo verificado con éxito! Ya puedes iniciar sesión.');
  } catch (error) {
    console.error(error);
    res.status(400).send('❌ Enlace inválido o expirado.');
  }
});

module.exports = router;
