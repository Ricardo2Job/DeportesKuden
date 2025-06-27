import { useState, useEffect } from 'react';
import imagen1 from './Imagenes/4.png';
import imagen2 from './Imagenes/2.png';
import imagen3 from './Imagenes/3.png';
import imagen3A from './Imagenes/3A.png';
import imagen4 from './Imagenes/4.png';
import imagen5 from './Imagenes/5.png';
import imagen6 from './Imagenes/20.png';
import imagen6A from './Imagenes/6A.png';
import imagen7 from './Imagenes/7.png';
import imagen7A from './Imagenes/7A.png';
import imagen8 from './Imagenes/19.png';
import logo from './Imagenes/Logo.png'; // Importa el logo

const ProductosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('nombre');

  const productos = [
    {
      id: 1,
      nombre: "Polera Deportiva Clásica",
      categoria: "poleras",
      imagen: imagen1,
    },
    {
      id: 2,
      nombre: "Polera Dry-Fit Pro",
      categoria: "poleras",
      imagen: imagen2,
    },
    {
      id: 3,
      nombre: "Short Deportivo Básico",
      categoria: "poleras",
      imagen: imagen3,
    },
    {
      id: 4,
      nombre: "Short Running Elite",
      categoria: "poleras",
      imagen: imagen4,
    },
    {
      id: 5,
      nombre: "Medias Deportivas Pack x3",
      categoria: "poleras",
      imagen: imagen5,
    },
    {
      id: 6,
      nombre: "Gorra Deportiva Ajustable",
      categoria: "accesorios",
      imagen: imagen6,
    },
    {
      id: 7,
      nombre: "Polera Térmica Manga Larga",
      categoria: "poleras",
      imagen: imagen7,
    },
    {
      id: 8,
      nombre: "Short Compresión Pro",
      categoria: "shorts",
      imagen: imagen8,
    }
  ];

  useEffect(() => {
    let filtered = selectedCategory === 'todos'
      ? productos
      : productos.filter(producto => producto.categoria === selectedCategory);

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'precio-asc':
          return a.precio - b.precio;
        case 'precio-desc':
          return b.precio - a.precio;
        case 'nombre':
          return a.nombre.localeCompare(b.nombre);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy]);

  return (
    <div className="container">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: #ffffff;
          line-height: 1.6;
        }

        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-image: url('../Imagenes/FondoInicio.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
          position: relative;
        }

        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.7) 0%, rgba(26, 26, 26, 0.8) 100%);
          z-index: -1;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 2px solid #666;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          width: 100vw;
          margin-left: calc(-50vw + 50%);
        }

        .logo {
          height: 45px;
          width: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .nav {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          padding: 10px 15px;
          border-radius: 6px;
          position: relative;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .nav-link:hover, .nav-link.active {
          color: #888;
          border-color: #888;
          background: rgba(136, 136, 136, 0.1);
        }

        .dropdown {
          position: relative;
        }

        .dropbtn {
          background: transparent;
          border: 1px solid transparent;
          color: #ffffff;
          padding: 10px 15px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .dropbtn:hover {
          color: #888;
          border-color: #888;
          background: rgba(136, 136, 136, 0.1);
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          min-width: 200px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          border: 1px solid #666;
          top: 100%;
          left: 0;
          z-index: 1000;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        .dropdown-content a {
          color: #ffffff;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          transition: all 0.3s ease;
        }

        .dropdown-content a:hover {
          background: rgba(136, 136, 136, 0.2);
          color: #888;
        }

        .boton-nav-rojo {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white !important;
          border: none !important;
        }

        .boton-nav-rojo:hover {
          background: linear-gradient(45deg, #b91c1c, #dc2626);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-icon {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .user-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .logout-btn {
          background: rgba(136, 136, 136, 0.2);
          color: #888;
          border: 1px solid #888;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .logout-btn:hover {
          background: rgba(136, 136, 136, 0.3);
          transform: translateY(-1px);
        }

        /* Hero Section */
        .hero-section {
          padding: 60px 40px;
          text-align: center;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="%23dc2626" opacity="0.1"/></svg>');
          background-size: 50px 50px;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-section h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #ffffff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-section p {
          font-size: 1.2rem;
          color: #cccccc;
          margin-bottom: 40px;
          line-height: 1.8;
        }

        /* Filtros y Controles */
        .controls-section {
          padding: 40px;
          background: rgba(26, 26, 26, 0.8);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(136, 136, 136, 0.2);
          border-bottom: 1px solid rgba(136, 136, 136, 0.2);
        }

        .controls-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .filter-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(136, 136, 136, 0.2);
          color: #cccccc;
          border: 1px solid rgba(136, 136, 136, 0.3);
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .filter-btn:hover, .filter-btn.active {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .sort-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sort-label {
          color: #cccccc;
          font-weight: 500;
        }

        .sort-select {
          background: rgba(26, 26, 26, 0.8);
          color: #cccccc;
          border: 1px solid rgba(136, 136, 136, 0.3);
          padding: 8px 15px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sort-select:hover, .sort-select:focus {
          border-color: #888;
          outline: none;
        }

        /* Productos Grid */
        .products-section {
          padding: 60px 40px;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 15px;
          overflow: hidden;
          border: 1px solid rgba(136, 136, 136, 0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-10px);
          border-color: #888;
          box-shadow: 0 15px 40px rgba(136, 136, 136, 0.2);
        }

        .product-image-container {
          width: 100%;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .product-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
        }

        /* Footer */
        .footer {
          background: #0a0a0a;
          padding: 50px 40px 30px;
          margin-top: auto;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }

        .footer-section h3 {
          color: #888;
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .footer-section p,
        .footer-section a {
          color: #cccccc;
          text-decoration: none;
          margin-bottom: 10px;
          display: block;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: #888;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #333;
          color: #666;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 20px;
          }

          .nav {
            flex-wrap: wrap;
            gap: 15px;
          }

          .hero-section h1 {
            font-size: 2rem;
          }

          .controls-container {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-buttons {
            justify-content: center;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" style={{ height: '100%', width: 'auto' }} />
        </div>
        <nav className="nav">
          <a href="/inicio" className="nav-link">Inicio</a>
          <a href="/productos" className="nav-link">Productos</a>
          <a href="/company" className="nav-link">Nuestra Compañía</a>
          <a href="/custom" className="nav-link">Personalización</a>
          <a href="/bomberos" className="nav-link boton-nav-rojo">Bomberos Chile</a>
        </nav>
        <div className="user-menu">
          <div className="dropdown">
            <button className="dropbtn">Usuario ▼</button>
            <div className="dropdown-content">
              <a href="/login">Iniciar Sesión</a>
              <a href="/register">Registrarse</a>
              <a href="/account">Mi Cuenta</a>
              <button className="logout-btn">Cerrar Sesión</button>
            </div>
          </div>
          <div className="user-icon">👤</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Nuestros Productos</h1>
          <p>
            Descubre nuestra amplia gama de productos deportivos de alta calidad.
          </p>
        </div>
      </section>

      {/* Controles y Filtros */}
      <section className="controls-section">
        <div className="controls-container">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedCategory === 'todos' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('todos')}
            >
              Todos los Productos
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'poleras' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('poleras')}
            >
              Poleras
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'shorts' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('shorts')}
            >
              Shorts
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'accesorios' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('accesorios')}
            >
              Accesorios
            </button>
          </div>

          <div className="sort-controls">
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="products-section">
        <div className="products-grid">
          {filteredProducts.map((producto) => (
            <div key={producto.id} className="product-card">
              <div className="product-image-container">
                <img
                  className="product-image"
                  src={producto.imagen}
                  alt={producto.nombre}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Deportes Kuden</h3>
            <p>Tu tienda deportiva de confianza</p>
          </div>
          <div className="footer-section">
            <h3>Productos</h3>
            <a href="/poleras">Poleras Deportivas</a>
            <a href="/shorts">Shorts</a>
            <a href="/accesorios">Accesorios</a>
            <a href="/custom">Personalización</a>
          </div>
          <div className="footer-section">
            <h3>Información</h3>
            <a href="/about">Sobre Nosotros</a>
            <a href="/contact">Contacto</a>
            <a href="/shipping">Envíos</a>
            <a href="/returns">Devoluciones</a>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>📞 +569 31840363</p>
            <p>📧 KudenDeportes@deporteskuden.cl</p>
            <p>📍 Santiago, Chile</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Deportes Kuden. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductosPage;
