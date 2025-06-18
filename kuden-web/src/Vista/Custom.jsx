import React, { useState } from "react";

const Custom = () => {
  const [activeSection, setActiveSection] = useState("modelos");
  const [selectedModel, setSelectedModel] = useState("modelo1");
  const [shirtName, setShirtName] = useState("");
  const [shirtNumber, setShirtNumber] = useState("");
  const [shirtColor, setShirtColor] = useState("#dc2626");
  const [shirtSize, setShirtSize] = useState("M");
  const [comments, setComments] = useState([
    {
      text: "Excelente herramienta de personalización, muy fácil de usar.",
      rating: 5,
      author: "Juan Pérez"
    },
    {
      text: "Me encanta poder ver la vista previa en tiempo real.",
      rating: 4,
      author: "María López"
    }
  ]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [selectedView, setSelectedView] = useState("frente");
  const [shirtLogo, setShirtLogo] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 30 });
  const [textPosition, setTextPosition] = useState({ x: 50, y: 60 });

  const modelos = Array.from({ length: 12 }, (_, i) => ({
    id: `modelo${i + 1}`,
    name: `Modelo ${i + 1}`,
    price: `$${(25000 + i * 2000).toLocaleString()}`
  }));

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Rojo", value: "#dc2626" },
    { name: "Azul", value: "#2563eb" },
    { name: "Verde", value: "#16a34a" },
    { name: "Negro", value: "#000000" },
    { name: "Blanco", value: "#ffffff" },
    { name: "Amarillo", value: "#eab308" },
    { name: "Morado", value: "#9333ea" },
    { name: "Naranja", value: "#ea580c" }
  ];

  const averageRating = comments.length === 0 ? 0 : Math.round(comments.reduce((acc, c) => acc + c.rating, 0) / comments.length);

  const handleAddComment = (e) => {
    e.preventDefault();
    const commentText = e.target.comment.value.trim();
    const authorName = e.target.author.value.trim() || "Anónimo";
    if (commentText && newRating > 0) {
      const newComment = {
        text: commentText,
        rating: newRating,
        author: authorName
      };
      setComments([...comments, newComment]);
      e.target.comment.value = "";
      e.target.author.value = "";
      setNewRating(0);
    }
  };

  const handleRatingClick = (value) => {
    setNewRating(value);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      setShirtLogo(logoUrl);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value) && value.length <= 20) {
      setShirtName(value);
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    const num = parseInt(value, 10);
    if (value === "" || (num >= 1 && num <= 99)) {
      setShirtNumber(value);
    }
  };

  const renderStars = (rating, clickable = false, onClickFn) => {
    return [...Array(5)].map((_, i) => {
      const starValue = i + 1;
      return (
        <span
          key={i}
          className={`star ${starValue <= rating ? "filled" : ""}`}
          onClick={() => clickable && onClickFn(starValue)}
          style={{ cursor: clickable ? "pointer" : "default" }}
        >
          ★
        </span>
      );
    });
  };

  const handleSaveDesign = () => {
    const design = {
      model: selectedModel,
      name: shirtName,
      number: shirtNumber,
      color: shirtColor,
      size: shirtSize,
      logo: shirtLogo,
      images: uploadedImages
    };
    alert("Diseño guardado exitosamente!");
    console.log("Diseño guardado:", design);
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
        }

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

        .custom-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
          flex: 1;
        }

        .page-header {
          text-align: center;
          margin-bottom: 50px;
          padding: 40px 0;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
        }

        .page-header::before {
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

        .page-header h1 {
          font-size: 3rem;
          margin-bottom: 15px;
          background: linear-gradient(45deg, #ffffff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          z-index: 1;
        }

        .page-header p {
          font-size: 1.2rem;
          color: #cccccc;
          position: relative;
          z-index: 1;
        }

        .custom-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
          margin-bottom: 50px;
        }

        .shirt-display-container {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          backdrop-filter: blur(10px);
        }

        .view-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          justify-content: center;
        }

        .view-btn {
          background: rgba(136, 136, 136, 0.2);
          color: #cccccc;
          border: 1px solid #666;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .view-btn.active {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white;
          border-color: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .shirt-preview {
          width: 100%;
          height: 500px;
          background: ${shirtColor};
          background-image: linear-gradient(135deg, ${shirtColor} 0%, ${shirtColor}dd 100%);
          border-radius: 15px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .shirt-content {
          text-align: center;
          color: ${shirtColor === '#ffffff' ? '#000000' : '#ffffff'};
          position: relative;
          z-index: 2;
        }

        .shirt-name {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .shirt-number {
          font-size: 4rem;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .shirt-logo {
          position: absolute;
          top: ${logoPosition.y}%;
          left: ${logoPosition.x}%;
          transform: translate(-50%, -50%);
          max-width: 80px;
          max-height: 80px;
          border-radius: 8px;
          z-index: 3;
        }

        .custom-panel {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          backdrop-filter: blur(10px);
          height: fit-content;
        }

        .section-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 30px;
        }

        .section-btn {
          background: rgba(136, 136, 136, 0.2);
          color: #cccccc;
          border: 1px solid #666;
          padding: 15px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          text-align: left;
        }

        .section-btn.active {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white;
          border-color: #dc2626;
          transform: translateX(5px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .section-content {
          min-height: 300px;
        }

        .models-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          max-height: 400px;
          overflow-y: auto;
          padding-right: 10px;
        }

        .models-grid::-webkit-scrollbar {
          width: 6px;
        }

        .models-grid::-webkit-scrollbar-track {
          background: rgba(136, 136, 136, 0.1);
          border-radius: 3px;
        }

        .models-grid::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }

        .model-card {
          background: rgba(136, 136, 136, 0.1);
          border: 2px solid transparent;
          border-radius: 12px;
          padding: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .model-card.selected {
          border-color: #dc2626;
          background: rgba(220, 38, 38, 0.2);
          transform: scale(1.05);
        }

        .model-card:hover {
          border-color: #888;
          transform: translateY(-2px);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          color: #888;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 12px 15px;
          background: rgba(136, 136, 136, 0.1);
          border: 1px solid #666;
          border-radius: 8px;
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #dc2626;
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
        }

        .form-input::placeholder {
          color: #999;
        }

        .color-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .color-option {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s ease;
          position: relative;
        }

        .color-option.selected {
          border-color: #ffffff;
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
        }

        .size-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .size-option {
          padding: 12px;
          background: rgba(136, 136, 136, 0.1);
          border: 2px solid #666;
          border-radius: 8px;
          color: #cccccc;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          font-weight: 500;
        }

        .size-option.selected {
          border-color: #dc2626;
          background: rgba(220, 38, 38, 0.2);
          color: white;
        }

        .upload-area {
          border: 2px dashed #666;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          background: rgba(136, 136, 136, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .upload-area:hover {
          border-color: #dc2626;
          background: rgba(220, 38, 38, 0.1);
        }

        .upload-area input {
          display: none;
        }

        .uploaded-images {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 10px;
          margin-top: 20px;
        }

        .uploaded-image {
          width: 100%;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }

        .btn-primary {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
        }

        .btn-secondary {
          background: rgba(136, 136, 136, 0.2);
          color: #888;
          border: 1px solid #888;
          padding: 15px 30px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
        }

        .btn-secondary:hover {
          background: rgba(136, 136, 136, 0.3);
          transform: translateY(-2px);
        }

        .reviews-section {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          backdrop-filter: blur(10px);
          margin-bottom: 40px;
        }

        .reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .reviews-header h3 {
          font-size: 1.8rem;
          color: #888;
        }

        .rating-display {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .star {
          color: #666;
          font-size: 1.5rem;
          transition: color 0.3s ease;
        }

        .star.filled {
          color: #ffd700;
        }

        .star:hover {
          color: #ffd700;
        }

        .comment-form {
          display: grid;
          gap: 20px;
          margin-bottom: 30px;
          padding: 30px;
          background: rgba(136, 136, 136, 0.1);
          border-radius: 15px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 20px;
        }

        .textarea {
          min-height: 100px;
          resize: vertical;
          font-family: inherit;
        }

        .rating-input {
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .comment {
          background: rgba(136, 136, 136, 0.1);
          padding: 25px;
          border-radius: 15px;
          border-left: 4px solid #dc2626;
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .comment-author {
          font-weight: bold;
          color: #888;
        }

        .comment-rating {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .comment-text {
          color: #cccccc;
          line-height: 1.6;
        }

        .footer {
          background: #0a0a0a;
          padding: 30px 40px;
          text-align: center;
          color: #666;
          border-top: 1px solid #333;
          margin-top: auto;
        }

        @media (max-width: 1200px) {
          .custom-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 20px;
          }

          .nav {
            flex-wrap: wrap;
            gap: 15px;
          }

          .page-header h1 {
            font-size: 2rem;
          }

          .models-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
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
          <a href="/customization" className="nav-link active">Personalización</a>
          <a href="/bomberos" className="nav-link boton-nav-rojo">Bomberos Chile</a>
        </nav>
        <div className="user-menu">
          <div className="dropdown">
            <button className="dropbtn">Usuario ▼</button>
            <div className="dropdown-content">
              <a href="/">Iniciar Sesión</a>
              <a href="/register">Registrarse</a>
              <a href="/account">Mi Cuenta</a>
              <button className="logout-btn">Cerrar Sesión</button>
            </div>
          </div>
          <div className="user-icon">👤</div>
        </div>
      </header>

      {/* Page Content */}
      <div className="custom-container">
        <div className="page-header">
          <h1>Personalización de Camisetas</h1>
          <p>Diseña tu camiseta perfecta con nuestro editor avanzado</p>
        </div>

        <div className="custom-layout">
          <div className="shirt-display-container">
            <div className="view-controls">
              {["frente", "espalda", "izquierda", "derecha"].map((view) => (
                <button
                  key={view}
                  className={`view-btn ${selectedView === view ? "active" : ""}`}
                  onClick={() => setSelectedView(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
            <div className="shirt-preview">
              {shirtLogo && (
                <img
                  src={shirtLogo}
                  alt="Logo"
                  className="shirt-logo"
                />
              )}
              <div className="shirt-content">
                {shirtName && <div className="shirt-name">{shirtName}</div>}
                {shirtNumber && <div className="shirt-number">{shirtNumber}</div>}
                {!shirtName && !shirtNumber && (
                  <div style={{ opacity: 0.5 }}>
                    <div className="shirt-name">Tu Nombre</div>
                    <div className="shirt-number">99</div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginTop: "20px", textAlign: "center", color: "#888" }}>
              <p>Vista: {selectedView} | Modelo: {selectedModel} | Talla: {shirtSize}</p>
            </div>
          </div>

          <div className="custom-panel">
            <nav className="section-nav">
              <button
                className={`section-btn ${activeSection === "modelos" ? "active" : ""}`}
                onClick={() => setActiveSection("modelos")}
              >
                🎽 Modelos de Camiseta
              </button>
              <button
                className={`section-btn ${activeSection === "colores" ? "active" : ""}`}
                onClick={() => setActiveSection("colores")}
              >
                🎨 Colores
              </button>
              <button
                className={`section-btn ${activeSection === "tallas" ? "active" : ""}`}
                onClick={() => setActiveSection("tallas")}
              >
                📏 Tallas
              </button>
              <button
                className={`section-btn ${activeSection === "nombre" ? "active" : ""}`}
                onClick={() => setActiveSection("nombre")}
              >
                🆔 Nombre y Número
              </button>
              <button
                className={`section-btn ${activeSection === "logo" ? "active" : ""}`}
                onClick={() => setActiveSection("logo")}
              >
                🖼️ Logo
              </button>
              <button
                className={`section-btn ${activeSection === "imagenes" ? "active" : ""}`}
                onClick={() => setActiveSection("imagenes")}
              >
                📷 Imágenes
              </button>
            </nav>

            <div className="section-content">
              {activeSection === "modelos" && (
                <div className="models-grid">
                  {modelos.map((modelo) => (
                    <div
                      key={modelo.id}
                      className={`model-card ${selectedModel === modelo.id ? "selected" : ""}`}
                      onClick={() => setSelectedModel(modelo.id)}
                    >
                      <p>{modelo.name}</p>
                      <p style={{ fontWeight: 'bold' }}>{modelo.price}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === "colores" && (
                <div className="form-group">
                  <label>Selecciona un color:</label>
                  <div className="color-grid">
                    {colors.map((color) => (
                      <div
                        key={color.value}
                        className={`color-option ${shirtColor === color.value ? "selected" : ""}`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setShirtColor(color.value)}
                      ></div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "tallas" && (
                <div className="form-group">
                  <label>Selecciona una talla:</label>
                  <div className="size-grid">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className={`size-option ${shirtSize === size ? "selected" : ""}`}
                        onClick={() => setShirtSize(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "nombre" && (
                <div>
                  <div className="form-group">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Nombre (máx. 20 caracteres)"
                      value={shirtName}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Número:</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Número (1-99)"
                      value={shirtNumber}
                      onChange={handleNumberChange}
                    />
                  </div>
                </div>
              )}

              {activeSection === "logo" && (
                <div className="upload-area" onClick={() => document.getElementById('logo-upload').click()}>
                  <p>Haz clic para subir un logo</p>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </div>
              )}

              {activeSection === "imagenes" && (
                <div className="upload-area" onClick={() => document.getElementById('image-upload').click()}>
                  <p>Haz clic para subir imágenes</p>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <div className="uploaded-images">
                    {uploadedImages.map((img, idx) => (
                      <img key={idx} src={img} alt={`Subida ${idx + 1}`} className="uploaded-image" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button className="btn-secondary">Cancelar</button>
              <button className="btn-primary" onClick={handleSaveDesign}>Guardar Diseño</button>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <div className="reviews-header">
            <h3>Reseñas</h3>
            <div className="rating-display">
              {renderStars(averageRating)}
              <span>{averageRating}/5</span>
            </div>
          </div>

          <form className="comment-form" onSubmit={handleAddComment}>
            <div className="form-row">
              <textarea
                name="comment"
                className="form-input textarea"
                placeholder="Deja un comentario..."
                required
              ></textarea>
              <div>
                <div className="form-group">
                  <label>Tu Nombre:</label>
                  <input
                    name="author"
                    type="text"
                    className="form-input"
                    placeholder="Nombre (opcional)"
                  />
                </div>
                <div className="form-group">
                  <label>Calificación:</label>
                  <div className="rating-input">
                    {renderStars(newRating, true, handleRatingClick)}
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={newRating === 0}>
              Agregar Comentario
            </button>
          </form>

          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <div className="comment-rating">
                      {renderStars(comment.rating)}
                    </div>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            ) : (
              <p>No hay comentarios aún.</p>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 Deportes Kuden. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Custom;
