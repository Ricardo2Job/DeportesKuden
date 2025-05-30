import './Style/Stylebomberos.css'; // Asegúrate de que esta ruta y nombre coincidan

const Bomberos = () => {
  return (
    <div className="fondo"> {/* fondo aplicado aquí */}
      <div className="bomberos-container">
        <div className="bomberos-card">
          <img 
            src="/imagenes/bomberos.jpg" 
            alt="Bomberos de Chile" 
            className="bomberos-image"
          />
          <h1 className="bomberos-title">Bomberos de Chile</h1>
          <p className="bomberos-subtitle">¡Próximamente!</p>
        </div>
      </div>
    </div>
  );
};

export default Bomberos;
