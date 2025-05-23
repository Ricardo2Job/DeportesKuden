// src/Vista/Bomberos.js
import './Style/StyleBomberos.css';

const Bomberos = () => {
  return (
    <div className="bomberos-container">
      <div className="bomberos-card">
        <img 
          src="/imagenes/bomberos.png" 
          alt="Bomberos de Chile" 
          className="bomberos-image"
        />
        <h1 className="bomberos-title">Bomberos de Chile</h1>
        <p className="bomberos-subtitle">¡Próximamente!</p>
      </div>
    </div>
  );
};

export default Bomberos;
