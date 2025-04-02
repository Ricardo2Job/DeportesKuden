import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/StyleInicio.css';

const images = [
  './Imagenes/Fondo1.png',
  './Imagenes/Fondo2.png',
  './Imagenes/Fondo3.png'
];

const App = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <img src="../Imagenes/Logo.png" alt="Logo" className="logo" />
        <nav className="nav">
          <Link to="/inicio" className="nav-link">Inicio</Link>
          <div className="dropdown">
            <button className="dropbtn">Productos</button>
            <div className="dropdown-content">
              {/* Aquí se agregarán productos más adelante */}
            </div>
          </div>
          <Link to="/company" className="nav-link">Nuestra Compañía</Link>
          <Link to="/contact" className="nav-link">Contáctanos</Link>
        </nav>
        <div className="user-menu">
          <div className="dropdown">
            <button className="dropbtn">Usuario</button>
            <div className="dropdown-content">
              <Link to="/">Iniciar Sesión</Link>
              <Link to="/register">Registrarse</Link>
            </div>
          </div>
          <i className="user-icon">👤</i>
        </div>
      </header>

      {/* Carrusel */}
      <section className="carousel">
        <img src={images[currentImage]} alt="Trabajo realizado" className="carousel-image" />
      </section>

      {/* Sección Custom */}
      <section className="custom-section">
        <h1>CUSTOM</h1>
        <button className="custom-btn">Get Started</button>
      </section>

      {/* Espacio para productos */}
      <section className="products-section">
        <h2>Próximamente: Personalización de Poleras Deportivas</h2>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Deportes Kuden. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
