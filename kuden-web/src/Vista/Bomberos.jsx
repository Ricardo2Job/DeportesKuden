import { useEffect, useState } from 'react';

const Bomberos = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const imageCount = 3;

  // Testimonios específicos para bomberos
  const testimonials = [
    {
      name: "Comandante Luis Herrera",
      company: "1ª Compañía de Bomberos Santiago",
      rating: 5,
      comment: "Los uniformes llegaron con excelente calidad y resistencia. Perfectos para nuestras operaciones diarias."
    },
    {
      name: "Voluntaria Carmen Silva",
      company: "3ª Compañía Valparaíso",
      rating: 5,
      comment: "El diseño respeta perfectamente nuestros protocolos y la comodidad es excepcional durante las emergencias."
    },
    {
      name: "Capitán Roberto Morales",
      company: "2ª Compañía Concepción",
      rating: 5,
      comment: "Como institución, valoramos la puntualidad y calidad. Deportes Kuden cumplió con todas nuestras expectativas."
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
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          position: relative;
        }

        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
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
          border-bottom: 2px solid #dc2626;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
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
          background: linear-gradient(45deg, #dc2626, #ef4444) !important;
          color: white !important;
          border: none !important;
        }

        .boton-nav-rojo:hover {
          background: linear-gradient(45deg, #b91c1c, #dc2626) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
          color: white !important;
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

        /* Hero Section Bomberos */
        .hero-section {
          position: relative;
          width: 90%;
          max-width: 1200px;
          height: 500px;
          margin: 40px auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(220, 38, 38, 0.4);
          background-image: url('/imagenes/bomberos.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.6) 0%, rgba(185, 28, 28, 0.7) 100%);
          z-index: 1;
        }

        .hero-content {
          text-align: center;
          z-index: 2;
          padding: 40px;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          color: white;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 30px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .hero-badge {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 15px 30px;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: inline-block;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        /* Sección de Información */
        .info-section {
          padding: 80px 40px;
          text-align: center;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
        }

        .info-section h2 {
          font-size: 2.5rem;
          margin-bottom: 30px;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .info-content {
          max-width: 800px;
          margin: 0 auto;
          font-size: 1.2rem;
          color: #cccccc;
          line-height: 1.8;
          margin-bottom: 50px;
        }

        /* Sección de Servicios */
        .services-section {
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
        }

        .services-section h2 {
          font-size: 2.5rem;
          margin-bottom: 50px;
          text-align: center;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .service-card {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 15px;
          padding: 30px;
          border: 1px solid rgba(220, 38, 38, 0.3);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          text-align: center;
        }

        .service-card:hover {
          transform: translateY(-10px);
          border-color: #dc2626;
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.3);
        }

        .service-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          color: #dc2626;
        }

        .service-card h3 {
          color: #dc2626;
          margin-bottom: 15px;
          font-size: 1.5rem;
        }

        .service-card p {
          color: #cccccc;
          line-height: 1.6;
        }

        /* Sección de Contacto */
        .contact-section {
          padding: 80px 40px;
          text-align: center;
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
        }

        .contact-section h2 {
          font-size: 2.5rem;
          margin-bottom: 30px;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-btn {
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
          margin: 20px 10px;
        }

        .contact-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
        }

        /* Testimonios */
        .testimonials-section {
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, rgba(0, 0, 0, 0.9) 100%);
          text-align: center;
        }

        .testimonials-section h2 {
          font-size: 2.5rem;
          margin-bottom: 50px;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .testimonial-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          height: 250px;
        }

        .testimonial {
          position: absolute;
          width: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          background: rgba(26, 26, 26, 0.8);
          padding: 30px;
          border-radius: 15px;
          border: 1px solid rgba(220, 38, 38, 0.3);
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
          color: #dc2626;
          font-size: 1.1rem;
          margin-bottom: 5px;
        }

        .testimonial-company {
          color: #888;
          font-size: 0.9rem;
        }

        /* Footer */
        .footer {
          background: #0a0a0a;
          padding: 50px 40px 30px;
          margin-top: auto;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          border-top: 2px solid #dc2626;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }

        .footer-section h3 {
          color: #dc2626;
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
          color: #dc2626;
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

          .hero-section {
            width: 95%;
            height: 400px;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .contact-btn {
            display: block;
            margin: 10px auto;
            width: 100%;
            max-width: 300px;
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

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🚒 Bomberos de Chile</h1>
          <p className="hero-subtitle">Uniformes de Calidad para Nuestros Héroes</p>
          <div className="hero-badge">¡Próximamente!</div>
        </div>
      </div>

      {/* Sección de Información */}
      <section className="info-section">
        <h2>Comprometidos con Nuestros Bomberos</h2>
        <div className="info-content">
          <p>
            En Deportes Kuden entendemos la importancia del trabajo que realizan nuestros bomberos voluntarios 
            día a día. Por eso, estamos desarrollando una línea especializada de uniformes y equipamiento 
            deportivo diseñada específicamente para las necesidades de las compañías de bomberos de Chile.
          </p>
          <p>
            Nuestros productos están pensados para ofrecer la máxima comodidad, durabilidad y funcionalidad 
            que requieren estos verdaderos héroes en su labor diaria de servicio a la comunidad.
          </p>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="services-section">
        <h2>Servicios Especializados</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">👕</div>
            <h3>Uniformes Personalizados</h3>
            <p>Diseños únicos que reflejan la identidad y tradición de cada compañía de bomberos.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏃‍♂️</div>
            <h3>Ropa Deportiva</h3>
            <p>Indumentaria cómoda y funcional para entrenamientos y actividades físicas.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🎯</div>
            <h3>Accesorios Especializados</h3>
            <p>Complementos diseñados para las necesidades específicas del cuerpo de bomberos.</p>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonials-section">
        <h2>Testimonios de Nuestros Bomberos</h2>
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
              <p className="testimonial-author">{testimonial.name}</p>
              <p className="testimonial-company">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="contact-section">
        <h2>¿Eres Parte de una Compañía de Bomberos?</h2>
        <div className="contact-content">
          <p style={{ color: '#cccccc', fontSize: '1.1rem', marginBottom: '30px' }}>
            Contáctanos para conocer más sobre nuestros servicios especializados 
            y cómo podemos ayudar a tu compañía con uniformes y equipamiento de calidad.
          </p>
          <button className="contact-btn">Proximamente</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Deportes Kuden</h3>
            <p>Especializados en uniformes deportivos y equipamiento para bomberos voluntarios de Chile.</p>
          </div>
          <div className="footer-section">
            <h3>Servicios Bomberos</h3>
            <a href="/bomberos/uniformes">Uniformes Personalizados</a>
            <a href="/bomberos/deportiva">Ropa Deportiva</a>
            <a href="/bomberos/accesorios">Accesorios</a>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>Email: bomberos@deporteskuden.cl</p>
            <p>Teléfono: +56 9 1234 5678</p>
            <p>Horario: Lun-Vie 9:00-18:00</p>
          </div>
          <div className="footer-section">
            <h3>Síguenos</h3>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Deportes Kuden - Comprometidos con los Bomberos de Chile</p>
        </div>
      </footer>
    </div>
  );
};

export default Bomberos;