import { Usuario }  from "../models/modelSchemas";

const usuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;
    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }
    const nuevoUsuario = new Usuario({
        nombre,
        apellido,
        email,
        password,
    }); 
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + error.message);
  }
};