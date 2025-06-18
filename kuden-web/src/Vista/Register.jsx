import { useState } from "react";
import "./Style/StyleAuth.css";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [rol, setRol] = useState("usuario");
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !correo || !contrasena || !telefono) {
      setError("Todos los campos son necesarios");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/usuarios", {
        nombre: username,
        rol,
        correo,
        contrasena,
        telefono,
        direccion,
      });
      setMensajeExito(response.data.mensaje);
      setError("");
      setUsername("");
      setCorreo("");
      setContrasena("");
      setTelefono("");
      setDireccion("");
      setRol("usuario");
    }catch (error) {
      setError(error.response?.data?.error || "Error al registrar el usuario.");
    }
    console.log("Registro con:", username, correo, contrasena);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        {error && <p className="error-message">{error}</p>}
        <h2>Registro</h2>
        <input 
          type="Username" 
          placeholder="Nombre de usuario" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input 
          type="Correo" 
          placeholder="Correo electrónico" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input 
          type="Contraseña" 
          placeholder="Contraseña" 
          value={contrasena} 
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <input 
          type="Telefono" 
          placeholder="Telefono" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <input 
          type="Direccion" 
          placeholder="Dirección" 
          value={direccion} 
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes cuenta? <a href="/">Inicia sesión</a></p>
      </form>
    </div>
  );
};

export default Register;
