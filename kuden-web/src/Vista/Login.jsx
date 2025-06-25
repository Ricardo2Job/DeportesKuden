import { useState } from "react";
import "./Style/StyleAuth.css";
import axios from "axios";


const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!correo || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        correo,
        contrasena: password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Inicio de sesión exitoso");
        window.location.href = "/"; // Redirigir al inicio
      } else {
        alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
      }
    }catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <input 
          type="correo" 
          placeholder="Correo electrónico" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
        <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
      </form>
    </div>
  );
};

export default Login;