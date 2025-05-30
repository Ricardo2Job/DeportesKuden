import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Style/StyleInicio.css';

const App = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const imageCount = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % imageCount);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <Link to="/inicio" className="logo-link">
          <div className="logo"></div>
        </Link>

        <nav className="nav">
          <Link to="/inicio" className="nav-link">Inicio</Link>

          <div className="dropdown">
            <button className="dropbtn">Productos</button>
            <div className="dropdown-content">
              <Link to="/poleras">Poleras Deportivas</Link>
              <Link to="/shorts">Shorts</Link>
              <Link to="/accesorios">Accesorios</Link>
            </div>
          </div>

          <Link to="/company" className="nav-link">Nuestra Compañía</Link>
          <Link to="/contact" className="nav-link">Contáctanos</Link>
          <Link to="/bomberos" className="nav-link boton-nav-rojo">Bomberos Chile</Link>
        </nav>

        <div className="user-menu">
          <div className="dropdown">
            <button className="dropbtn">Usuario</button>
            <div className="dropdown-content">
              <Link to="/">Iniciar Sesión</Link>
              <Link to="/register">Registrarse</Link>
              <Link to="/account">Mi Cuenta</Link>
            </div>
          </div>
          <div className="user-icon">👤</div>
        </div>
      </header>

      {/* Carrusel */}
      <section className="carousel">
        <div className={`carousel-image carousel-image-${currentImage}`}></div>
      </section>

      {/* Sección Custom */}
      <section className="custom-section">
        <h1>CUSTOM</h1>
        <button className="custom-btn">Get Started</button>
      </section>

      {/* Sección de Productos */}
      <section className="products-section">
        <h2>Próximamente: Personalización de Poleras Deportivas</h2>
        <p>
          Diseña tu propia indumentaria deportiva con nuestro nuevo servicio de personalización exclusiva. Crea equipaciones únicas para tu equipo con los colores y diseños que prefieras.
        </p>
      </section>

    </div>
  );
};

export default App;
