const express = require('express');
const router = express.Router();
const User = require('../models/User');
const sendVerificationEmail = require('../utils/sendVerificationEmail');

// Registro de usuario
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Crea el usuario
    const user = await User.create({ email, password });

    // Envía el correo de verificación
    await sendVerificationEmail(user);

    res.status(201).send('✅ Usuario registrado. Verifica tu correo.');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error al registrar usuario.');
  }
});

module.exports = router;
