import { useState, useEffect } from 'react';
import imagen1 from './Imagenes/1A.png';
import imagen2 from './Imagenes/2.png';
import imagen3 from './Imagenes/3.png';
import imagen3A from './Imagenes/3A.png';
import imagen4 from './Imagenes/4.png';
import imagen5 from './Imagenes/5.png';
import imagen6 from './Imagenes/6.png';
import imagen6A from './Imagenes/6A.png';
import imagen7 from './Imagenes/7.png';
import imagen7A from './Imagenes/7A.png';
import imagen8 from './Imagenes/8.png';

const ProductosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('nombre');

  // Productos de ejemplo con imágenes importadas
  const productos = [
    {
      id: 1,
      nombre: "Polera Deportiva Clásica",
      categoria: "poleras",
      precio: 15990,
      imagen: imagen1,
      descripcion: "Polera deportiva de alta calidad con diseño clásico y materiales transpirables",
      colores: ["Rojo", "Azul", "Negro", "Blanco"],
      tallas: ["S", "M", "L", "XL", "XXL"],
      destacado: true
    },
    {
      id: 2,
      nombre: "Polera Dry-Fit Pro",
      categoria: "poleras",
      precio: 22990,
      imagen: imagen2,
      descripcion: "Tecnología Dry-Fit para máximo rendimiento y comodidad durante el ejercicio",
      colores: ["Negro", "Gris", "Azul Marino"],
      tallas: ["S", "M", "L", "XL"],
      destacado: true
    },
    {
      id: 3,
      nombre: "Short Deportivo Básico",
      categoria: "shorts",
      precio: 12990,
      imagen: imagen3,
      descripcion: "Short cómodo y versátil para todo tipo de actividades deportivas",
      colores: ["Negro", "Gris", "Azul"],
      tallas: ["S", "M", "L", "XL", "XXL"],
      destacado: false
    },
    {
      id: 4,
      nombre: "Short Running Elite",
      categoria: "shorts",
      precio: 18990,
      imagen: imagen4,
      descripcion: "Diseñado especialmente para running con tecnología anti-rozaduras",
      colores: ["Negro", "Azul", "Rojo"],
      tallas: ["S", "M", "L", "XL"],
      destacado: true
    },
    {
      id: 5,
      nombre: "Medias Deportivas Pack x3",
      categoria: "accesorios",
      precio: 8990,
      imagen: imagen5,
      descripcion: "Pack de 3 pares de medias deportivas con refuerzo en talón y puntera",
      colores: ["Blanco", "Negro", "Mixto"],
      tallas: ["S", "M", "L"],
      destacado: false
    },
    {
      id: 6,
      nombre: "Gorra Deportiva Ajustable",
      categoria: "accesorios",
      precio: 9990,
      imagen: imagen6,
      descripcion: "Gorra con protección UV y ajuste perfecto para entrenamientos",
      colores: ["Negro", "Blanco", "Rojo", "Azul"],
      tallas: ["Única"],
      destacado: false
    },
    {
      id: 7,
      nombre: "Polera Térmica Manga Larga",
      categoria: "poleras",
      precio: 25990,
      imagen: imagen7,
      descripcion: "Perfecta para entrenamientos en clima frío con tecnología térmica",
      colores: ["Negro", "Gris", "Blanco"],
      tallas: ["S", "M", "L", "XL", "XXL"],
      destacado: false
    },
    {
      id: 8,
      nombre: "Short Compresión Pro",
      categoria: "shorts",
      precio: 24990,
      imagen: imagen8,
      descripcion: "Short de compresión para mejor rendimiento y recuperación muscular",
      colores: ["Negro", "Azul Marino"],
      tallas: ["S", "M", "L", "XL"],
      destacado: true
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

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  };

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
          width: 160px;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
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

        .product-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        .product-info {
          padding: 20px;
        }

        .product-name {
          font-size: 1.3rem;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .product-description {
          color: #cccccc;
          font-size: 0.9rem;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .product-price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #888;
          margin-bottom: 15px;
        }

        .product-colors {
          display: flex;
          gap: 8px;
          margin-bottom: 15px;
        }

        .color-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(136, 136, 136, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .color-dot:hover {
          transform: scale(1.2);
          border-color: #888;
        }

        .product-sizes {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .size-option {
          background: rgba(136, 136, 136, 0.2);
          color: #cccccc;
          border: 1px solid rgba(136, 136, 136, 0.3);
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .size-option:hover {
          background: rgba(136, 136, 136, 0.4);
          color: white;
        }

        .product-actions {
          display: flex;
          gap: 10px;
        }

        .add-to-cart-btn {
          flex: 1;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-to-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .view-details-btn {
          background: rgba(136, 136, 136, 0.2);
          color: #888;
          border: 1px solid #888;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .view-details-btn:hover {
          background: rgba(136, 136, 136, 0.3);
          transform: translateY(-2px);
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

          .product-actions {
            flex-direction: column;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="logo">Deportes Kuden</div>
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
            Desde poleras hasta accesorios, todo lo que necesitas para destacar
            en tu deporte favorito.
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
            <span className="sort-label">Ordenar por:</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="nombre">Nombre</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
            </select>
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
                {producto.destacado && (
                  <div className="product-badge">Destacado</div>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-name">{producto.nombre}</h3>
                <p className="product-description">{producto.descripcion}</p>
                <div className="product-price">{formatPrice(producto.precio)}</div>

                <div className="product-colors">
                  {producto.colores.map((color, index) => (
                    <div
                      key={index}
                      className="color-dot"
                      style={{
                        backgroundColor: color === 'Rojo' ? '#dc2626' :
                          color === 'Azul' ? '#3b82f6' :
                          color === 'Negro' ? '#000' :
                          color === 'Blanco' ? '#fff' :
                          color === 'Gris' ? '#6b7280' :
                          color === 'Azul Marino' ? '#1e3a8a' :
                          color === 'Mixto' ? '#6b7280' : '#888'
                      }}
                      title={color}
                    />
                  ))}
                </div>

                <div className="product-sizes">
                  {producto.tallas.map((talla, index) => (
                    <span key={index} className="size-option">{talla}</span>
                  ))}
                </div>

                <div className="product-actions">
                  <button className="add-to-cart-btn">Agregar al Carrito</button>
                  <button className="view-details-btn">Ver Detalles</button>
                </div>
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
            <p>Calidad y estilo en cada producto</p>
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
