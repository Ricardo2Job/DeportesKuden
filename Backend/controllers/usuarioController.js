import { Usuario }  from "../models/modelSchemas";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena } = req.body;
    if (!nombre || !apellido || !email || !contrasena) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const hashedContrasena = bcrypt.hashSync(contrasena, 8);

    const nuevoUsuario = new Usuario({
        nombre,
        apellido,
        email,
        contrasena: hashedContrasena,
    }); 
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario creado correctamente." });
  } catch (error) {
    throw new Error("Error al crear un usuario: " + error.message);
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios." });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    // Si usas JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET || "secreto", // configura un secreto en .env
      { expiresIn: "1h" }
    );

    res.status(200).json({ mensaje: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión: " + error.message });
  }
};

export default {
  crearUsuario,
  loginUsuario,
};
