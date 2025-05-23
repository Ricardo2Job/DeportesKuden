import React, { useState } from "react";
import "./Style/StyleCustom.css";

const Custom = () => {
  const [activeSection, setActiveSection] = useState("modelos");
  const [selectedModel, setSelectedModel] = useState("modelo1");
  const [shirtName, setShirtName] = useState("");
  const [shirtNumber, setShirtNumber] = useState("");
  const [comments, setComments] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [selectedView, setSelectedView] = useState("frente");
  const [shirtLogo, setShirtLogo] = useState(null);

  const modelos = Array.from({ length: 30 }, (_, i) => `modelo${i + 1}`);

  const averageRating =
    comments.length === 0
      ? 0
      : Math.round(
          comments.reduce((acc, c) => acc + c.rating, 0) / comments.length
        );

  const handleAddComment = (e) => {
    e.preventDefault();
    const commentText = e.target.comment.value.trim();
    if (commentText && newRating > 0) {
      const newComment = { text: commentText, rating: newRating };
      setComments([...comments, newComment]);
      e.target.comment.value = "";
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
    if (/^[a-zA-Z\s]*$/.test(value)) {
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
          role={clickable ? "button" : undefined}
          aria-label={clickable ? `Poner ${starValue} estrellas` : undefined}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="custom-container">
          <h1>Personalización de Camisetas</h1>

          <div className="custom-layout">
            <div
              className="shirt-display"
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <div
                className="view-buttons-vertical"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginRight: "15px",
                  minWidth: "110px",
                }}
              >
                {["frente", "espalda", "izquierda", "derecha"].map((view) => (
                  <button
                    key={view}
                    onClick={() => setSelectedView(view)}
                    className={selectedView === view ? "active" : ""}
                    style={{
                      height: "50px",
                      fontSize: "16px",
                      cursor: "pointer",
                      borderRadius: "6px",
                      border:
                        selectedView === view
                          ? "2px solid #007BFF"
                          : "1px solid #ccc",
                      backgroundColor:
                        selectedView === view ? "#E3F2FD" : "#fff",
                    }}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>

              <div
                className={`shirt-preview ${selectedModel} ${selectedView}`}
                style={{
                  flex: 1,
                  maxWidth: "300px",
                  transition: "max-width 0.3s ease",
                }}
              >
                <div className="shirt-base">
                  <p className="shirt-label">
                    Vista previa: {selectedModel} - {selectedView}
                  </p>
                  {uploadedImages.length > 0 && (
                    <div className="uploaded-images">
                      {uploadedImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Subida ${idx + 1}`}
                          className="uploaded-image"
                        />
                      ))}
                    </div>
                  )}
                  <div className="shirt-details">
                    <p>{shirtName || "Nombre de camiseta"}</p>
                    <p>{shirtNumber || "Número"}</p>
                  </div>
                  {shirtLogo && (
                    <div style={{ marginTop: 10 }}>
                      <p>Logo cargado:</p>
                      <img
                        src={shirtLogo}
                        alt="Logo camiseta"
                        style={{ maxWidth: "150px", maxHeight: "150px" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="custom-right-panel">
              <nav className="section-buttons">
                <button
                  className={activeSection === "modelos" ? "active" : ""}
                  onClick={() => setActiveSection("modelos")}
                >
                  Modelos de Camiseta
                </button>
                <button
                  className={activeSection === "nombre" ? "active" : ""}
                  onClick={() => setActiveSection("nombre")}
                >
                  Nombre y Número
                </button>
                <button
                  className={activeSection === "imagenes" ? "active" : ""}
                  onClick={() => setActiveSection("imagenes")}
                >
                  Subir Imágenes
                </button>
              </nav>

              <div className="section-content">
                {activeSection === "modelos" && (
                  <div className="modelos-scroll">
                    {modelos.map((modelo) => (
                      <button
                        key={modelo}
                        className={`modelo-btn ${
                          selectedModel === modelo ? "selected" : ""
                        }`}
                        onClick={() => setSelectedModel(modelo)}
                      >
                        {modelo}
                      </button>
                    ))}
                  </div>
                )}

                {activeSection === "nombre" && (
                  <div className="nombre-numero">
                    <input
                      type="text"
                      placeholder="Nombre de la camiseta"
                      value={shirtName}
                      onChange={handleNameChange}
                    />
                    <input
                      type="number"
                      placeholder="Número (1-99)"
                      value={shirtNumber}
                      onChange={handleNumberChange}
                    />

                    <label style={{ marginTop: "10px", display: "block" }}>
                      Subir Logo:
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        style={{ marginTop: "5px" }}
                      />
                    </label>
                  </div>
                )}

                {activeSection === "imagenes" && (
                  <div className="subir-imagenes">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />
                    <p>
                      Sube imágenes y elige dónde colocarlas (función no
                      implementada aún).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="comentarios reseñas-abajo sin-caja">
            <div className="reseñas-header">
              <h3>Reseñas</h3>
              <div className="stars">{renderStars(averageRating)}</div>
            </div>
            <form onSubmit={handleAddComment}>
              <div className="rating-input">
                {renderStars(newRating, true, handleRatingClick)}
              </div>
              <textarea
                name="comment"
                placeholder="Deja un comentario..."
                rows="4"
              />
              <button type="submit" disabled={newRating === 0}>
                Agregar Comentario
              </button>
            </form>
            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <div key={i} className="comment">
                    <div className="comment-stars-number">
                      {c.rating} <span className="single-star">★</span>
                    </div>
                    <p>{c.text}</p>
                    <hr className="comment-separator" />
                  </div>
                ))
              ) : (
                <p>No hay comentarios aún.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        © 2025 Deportes Kuden. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Custom;
