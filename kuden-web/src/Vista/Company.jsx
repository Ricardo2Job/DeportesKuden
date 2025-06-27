import { useEffect, useState } from 'react';
import logo from './Imagenes/Logo.png'; // Importa el logo

const NuestraCompania = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [counters, setCounters] = useState({
    años: 0,
    clientes: 0,
    productos: 0,
    satisfaccion: 0
  });

  const stats = [
    { label: "Años de Experiencia", value: 10, suffix: "+" },
    { label: "Clientes Satisfechos", value: 1500, suffix: "+" },
    { label: "Productos Entregados", value: 12000, suffix: "+" },
    { label: "Satisfacción del Cliente", value: 98, suffix: "%" }
  ];

  const clients = [
    "Lotto", "Cobreloa", "Universidad de Concepción", "CD Trasandino",
    "Universidades", "Institutos", "Empresas Privadas", "Instituciones Públicas"
  ];

  const disciplines = [
    "Fútbol", "Voleibol", "Básquetbol", "Rugby",
    "Tenis", "Hándbol", "Running", "Ropa Corporativa"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      stats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.value / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }

          setCounters(prev => ({
            ...prev,
            [index === 0 ? 'años' : index === 1 ? 'clientes' : index === 2 ? 'productos' : 'satisfaccion']: Math.floor(current)
          }));
        }, stepTime);
      });
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

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

        .nav-link:hover {
          color: #888;
          border-color: #888;
          background: rgba(136, 136, 136, 0.1);
        }

        .nav-link.active {
          color: #888;
          border-color: #888;
          background: rgba(136, 136, 136, 0.2);
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
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%);
          padding: 100px 40px;
          text-align: center;
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
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="%23ffffff" opacity="0.1"/></svg>');
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
          font-size: 3.5rem;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #ffffff, #cccccc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: bold;
        }

        .hero-section p {
          font-size: 1.3rem;
          color: #ffffff;
          margin-bottom: 30px;
          line-height: 1.8;
        }

        /* Stats Section */
        .stats-section {
          padding: 80px 40px;
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stat-card {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 20px;
          padding: 40px 20px;
          text-align: center;
          border: 1px solid rgba(136, 136, 136, 0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .stat-card:hover::before {
          transform: scaleX(1);
        }

        .stat-card:hover {
          transform: translateY(-10px);
          border-color: #888;
          box-shadow: 0 15px 40px rgba(136, 136, 136, 0.2);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: bold;
          color: #888;
          margin-bottom: 10px;
          display: block;
        }

        .stat-label {
          font-size: 1.1rem;
          color: #cccccc;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* About Section */
        .about-section {
          padding: 80px 40px;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
        }

        .about-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-text h2 {
          font-size: 2.5rem;
          margin-bottom: 30px;
          background: linear-gradient(45deg, #ffffff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-text p {
          font-size: 1.1rem;
          color: #cccccc;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .about-image {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 20px;
          height: 400px;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23dc2626"/><text x="200" y="200" text-anchor="middle" fill="white" font-size="24">Kuden</text></svg>');
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(136, 136, 136, 0.2);
        }

        /* Clients Section */
        .clients-section {
          padding: 80px 40px;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
          text-align: center;
        }

        .clients-section h2 {
          font-size: 2.5rem;
          margin-bottom: 50px;
          background: linear-gradient(45deg, #ffffff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .clients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto 60px;
        }

        .client-card {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 15px;
          padding: 30px 20px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .client-card:hover {
          transform: translateY(-5px);
          border-color: #888;
          box-shadow: 0 10px 30px rgba(136, 136, 136, 0.2);
        }

        .client-name {
          font-size: 1.1rem;
          font-weight: bold;
          color: #888;
        }

        /* Disciplines Section */
        .disciplines-section {
          padding: 80px 40px;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
          text-align: center;
        }

        .disciplines-section h2 {
          font-size: 2.5rem;
          margin-bottom: 50px;
          background: linear-gradient(45deg, #ffffff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .disciplines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .discipline-card {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 15px;
          padding: 30px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .discipline-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(220, 38, 38, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .discipline-card:hover::before {
          opacity: 1;
        }

        .discipline-card:hover {
          transform: translateY(-10px);
          border-color: #888;
          box-shadow: 0 15px 40px rgba(136, 136, 136, 0.2);
        }

        .discipline-name {
          font-size: 1.3rem;
          font-weight: bold;
          color: #888;
          position: relative;
          z-index: 1;
        }

        /* Contact Section */
        .contact-section {
          padding: 80px 40px;
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
          text-align: center;
        }

        .contact-section h2 {
          font-size: 2.5rem;
          margin-bottom: 30px;
          background: linear-gradient(45deg, #ffffff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-info {
          max-width: 800px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 50px;
        }

        .contact-card {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 15px;
          padding: 30px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .contact-card:hover {
          transform: translateY(-5px);
          border-color: #888;
          box-shadow: 0 10px 30px rgba(136, 136, 136, 0.2);
        }

        .contact-icon {
          font-size: 2rem;
          color: #888;
          margin-bottom: 15px;
        }

        .contact-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #888;
          margin-bottom: 10px;
        }

        .contact-detail {
          color: #cccccc;
          font-size: 1rem;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 40px;
        }

        .social-link {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
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
            font-size: 2.5rem;
          }

          .about-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .clients-grid,
          .disciplines-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .contact-info {
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
          <a href="/company" className="nav-link active">Nuestra Compañía</a>
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
          <h1>Nuestra Compañía</h1>
          <p>
            Kuden es una marca chilena dedicada a la confección de vestuario deportivo
            de calidad para alto rendimiento. Con más de una década de experiencia,
            hemos vestido a los mejores equipos y atletas del país.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{counters.años}+</span>
            <span className="stat-label">Años de Experiencia</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{counters.clientes}+</span>
            <span className="stat-label">Clientes Satisfechos</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{counters.productos.toLocaleString()}+</span>
            <span className="stat-label">Productos Entregados</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{counters.satisfaccion}%</span>
            <span className="stat-label">Satisfacción del Cliente</span>
          </div>
        </div>
      </section>

     {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Quiénes Somos</h2>
            <p>
              Con más de 10 años de experiencia en el mercado, Kuden se ha consolidado
              como una de las marcas líderes en la confección de vestuario deportivo
              en Chile. Nuestra pasión por el deporte y el compromiso con la calidad
              nos ha llevado a trabajar con importantes marcas e instituciones.
            </p>
            <p>
              Estamos convencidos de que el vestuario juega un rol fundamental en el
              desempeño exitoso de cualquier actividad deportiva o recreativa. Por eso,
              cada prenda que confeccionamos está diseñada con los más altos estándares
              de calidad y rendimiento.
            </p>
            <p>
              Nuestro equipo de profesionales altamente capacitados trabaja día a día
              para ofrecer soluciones integrales que satisfagan las necesidades específicas
              de cada cliente, desde equipos profesionales hasta instituciones educativas.
            </p>
          </div>
          <div className="about-image">
            <img src={logo} alt="Logo" style={{ width: '100%', height: 'auto', borderRadius: '20px' }} />
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients-section">
        <h2>Nuestros Clientes</h2>
        <div className="clients-grid">
          {clients.map((client, index) => (
            <div key={index} className="client-card">
              <div className="client-name">{client}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Disciplines Section */}
      <section className="disciplines-section">
        <h2>Disciplinas Deportivas</h2>
        <div className="disciplines-grid">
          {disciplines.map((discipline, index) => (
            <div key={index} className="discipline-card">
              <div className="discipline-name">{discipline}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contáctanos</h2>
        <div className="contact-info">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <div className="contact-title">Email</div>
            <div className="contact-detail">KudenDeportes@gmail.com</div>
          </div>
          <div className="contact-card">
            <div className="contact-icon">📱</div>
            <div className="contact-title">Teléfono</div>
            <div className="contact-detail">+569 31840363</div>
          </div>
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <div className="contact-title">Dirección</div>
            <div className="contact-detail">Santiago, Chile</div>
          </div>
        </div>

        <div className="social-links">
          <a href="#" className="social-link">📘</a>
          <a href="#" className="social-link">📷</a>
          <a href="#" className="social-link">🐦</a>
          <a href="#" className="social-link">💼</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Deportes Kuden</h3>
            <p>Vestuario deportivo de calidad para alto rendimiento</p>
            <p>Más de 10 años vistiendo a los mejores</p>
          </div>
          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <a href="/inicio">Inicio</a>
            <a href="/productos">Productos</a>
            <a href="/personalización">Personalización</a>
            <a href="/contacto">Contacto</a>
          </div>
          <div className="footer-section">
            <h3>Productos</h3>
            <a href="/poleras">Poleras Deportivas</a>
            <a href="/shorts">Shorts</a>
            <a href="/accesorios">Accesorios</a>
            <a href="/corporativo">Ropa Corporativa</a>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>📧 DeportesKuden@gmail.com</p>
            <p>📱 +569 31840363</p>
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

export default NuestraCompania;
