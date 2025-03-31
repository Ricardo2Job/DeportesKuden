import { useState } from "react";
import "./Style/StyleAuth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registro con:", username, email, password);
  };

  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Registro</h2>
        <input 
          type="text" 
          placeholder="Nombre de usuario" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes cuenta? <a href="/">Inicia sesión</a></p>
      </form>
    </div>
  );
};

export default Register;
