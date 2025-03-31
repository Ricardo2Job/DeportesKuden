import { useState } from "react";
import "./Style/StyleAuth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login con:", email, password);
  };

  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Iniciar Sesión</h2>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
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