import { useEffect, useState } from 'react';

const App = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const imageCount = 3;

  // Testimonios de ejemplo
  const testimonials = [
    {
      name: "Carlos Mendoza",
      rating: 5,
      comment: "Increíble calidad en las camisetas personalizadas. Mi equipo quedó fascinado con el resultado final."
    },
    {
      name: "María González",
      rating: 5,
      comment: "El proceso de personalización es muy intuitivo y el resultado superó mis expectativas. Totalmente recomendado."
    },
    {
      name: "Diego Rodríguez",
      rating: 4,
      comment: "Excelente servicio al cliente y entregas puntuales. Las camisetas llegaron exactamente como las diseñé."
    },
    {
      name: "Ana Martínez",
      rating: 5,
      comment: "Como entrenadora, necesitaba uniformes únicos para mi equipo. El resultado fue perfecto y profesional."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % imageCount);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(testimonialInterval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
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

        .nav-link:hover {
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

        /* Carrusel Mejorado */
        .carousel-container {
          position: relative;
          width: 90%;
          max-width: 1200px;
          height: 500px;
          margin: 40px auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .carousel {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .carousel-image {
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
        }

        .carousel-image.active {
          opacity: 1;
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(220, 38, 38, 0.2) 100%);
          z-index: 1;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 2;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #888;
          transform: scale(1.2);
        }

        /* Sección de Productos */
        .products-section {
          padding: 60px 40px;
          text-align: center;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
        }

        .products-section h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #ffffff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin: 40px 0;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .product-card {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 15px;
          padding: 20px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .product-card:hover {
          transform: translateY(-10px);
          border-color: #888;
          box-shadow: 0 15px 40px rgba(136, 136, 136, 0.2);
        }

        .product-image {
          width: 100%;
          height: 200px;
          background: #333;
          border-radius: 10px;
          margin-bottom: 15px;
          background-size: cover;
          background-position: center;
        }

        .ver-mas-btn {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 30px;
        }

        .ver-mas-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
        }

        /* Sección de Personalización */
        .custom-section {
          padding: 80px 40px;
          text-align: center;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
          position: relative;
          overflow: hidden;
        }

        .custom-section::before {
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

        .custom-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .custom-section h2 {
          font-size: 3rem;
          margin-bottom: 30px;
          background: linear-gradient(45deg, #ffffff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .custom-section p {
          font-size: 1.2rem;
          color: #cccccc;
          margin-bottom: 40px;
          line-height: 1.8;
        }

        .custom-btn {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white;
          border: none;
          padding: 18px 40px;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .custom-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
        }

        /* Testimonios */
        .testimonials-section {
          padding: 60px 40px;
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
          text-align: center;
        }

        .testimonials-section h2 {
          font-size: 2.5rem;
          margin-bottom: 50px;
          background: linear-gradient(45deg, #ffffff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .testimonial-container {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          height: 200px;
        }

        .testimonial {
          position: absolute;
          width: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          background: rgba(26, 26, 26, 0.8);
          padding: 30px;
          border-radius: 15px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          backdrop-filter: blur(10px);
        }

        .testimonial.active {
          opacity: 1;
        }

        .stars {
          margin-bottom: 15px;
        }

        .star {
          color: #666;
          font-size: 1.5rem;
          margin: 0 2px;
          transition: color 0.3s ease;
        }

        .star.filled {
          color: #ffd700;
        }

        .testimonial-text {
          font-size: 1.1rem;
          color: #cccccc;
          margin-bottom: 20px;
          font-style: italic;
        }

        .testimonial-author {
          font-weight: bold;
          color: #888;
          font-size: 1.1rem;
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

          .carousel-container {
            width: 95%;
            height: 300px;
          }

          .custom-section h2 {
            font-size: 2rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="logo">Deportes Kuden</div>

        <nav className="nav">
          <a href="/inicio" className="nav-link">Inicio</a>

          <div className="dropdown">
            <a href="/productos" className="dropbtn">Productos ▼</a>
            <div className="dropdown-content">
              <a href="/poleras">Poleras Deportivas</a>
              <a href="/shorts">Shorts</a>
              <a href="/accesorios">Accesorios</a>
            </div>
          </div>

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

      {/* Carrusel Mejorado */}
      <div className="carousel-container">
        <div className="carousel">
          <div className="carousel-overlay"></div>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`carousel-image ${currentImage === index ? 'active' : ''}`}
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><rect width="800" height="400" fill="%23${index === 0 ? '333' : index === 1 ? '444' : '555'}"/><text x="400" y="200" text-anchor="middle" fill="white" font-size="48">Imagen ${index + 1}</text></svg>')`
              }}
            ></div>
          ))}

          <div className="carousel-indicators">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`indicator ${currentImage === index ? 'active' : ''}`}
                onClick={() => setCurrentImage(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de Productos */}
      <section className="products-section">
        <h2>Nuestros Productos Destacados</h2>
        <div className="products-grid">
          {[
            { name: "Poleras Deportivas", desc: "Diseños modernos y materiales de alta calidad" },
            { name: "Shorts Deportivos", desc: "Comodidad y estilo para tu rendimiento" },
            { name: "Accesorios", desc: "Complementa tu look deportivo" }
          ].map((product, index) => (
            <div key={index} className="product-card">
              <div
                className="product-image"
                style={{
                  backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23${index === 0 ? 'dc2626' : index === 1 ? '666' : '888'}"/><text x="150" y="100" text-anchor="middle" fill="white" font-size="24">${product.name}</text></svg>')`
                }}
              ></div>
              <h3 style={{ color: '#888', marginBottom: '10px' }}>{product.name}</h3>
              <p style={{ color: '#cccccc' }}>{product.desc}</p>
            </div>
          ))}
        </div>
        <button className="ver-mas-btn">Ver Más Productos</button>
      </section>

      {/* Sección de Personalización */}
      <section className="custom-section">
        <div className="custom-content">
          <h2>Personaliza Tu Equipo Deportivo</h2>
          <p>
            Diseña camisetas únicas que reflejen la identidad de tu equipo.
            Agrega tu logo, elige colores personalizados y crea uniformes que
            destaquen en cada competencia. Nuestro sistema de personalización te
            permite visualizar tus ideas en tiempo real y crear equipaciones
            verdaderamente profesionales.
          </p>
          <button className="custom-btn">Comenzar Personalización</button>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonials-section">
        <h2>Lo Que Dicen Nuestros Clientes</h2>
        <div className="testimonial-container">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial ${currentTestimonial === index ? 'active' : ''}`}
            >
              <div className="stars">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.comment}"</p>
              <p className="testimonial-author">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
