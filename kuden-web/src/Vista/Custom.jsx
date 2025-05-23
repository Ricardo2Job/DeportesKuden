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
    <div className="custom-container">
      <h1>Personalización de Camisetas</h1>

      <div className="custom-layout">
        <div className="shirt-display">
          <div className={`shirt-preview ${selectedModel}`}>
            <div className="shirt-base">
              <p className="shirt-label">Vista previa: {selectedModel}</p>
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
            </div>
          </div>
        </div>

        <div className="custom-right-panel">
          {/* Menú sin comentarios */}
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
                  onChange={(e) => setShirtName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Número"
                  value={shirtNumber}
                  onChange={(e) => setShirtNumber(e.target.value)}
                />
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
                  Sube imágenes y elige dónde colocarlas (función no implementada
                  aún).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sección Reseñas fuera del layout, sin caja */}
      <div className="comentarios reseñas-abajo sin-caja">
        <div className="reseñas-header">
          <h3>Reseñas</h3>
          <div className="stars">{renderStars(averageRating)}</div>
        </div>
        <form onSubmit={handleAddComment}>
          <div className="rating-input">{renderStars(newRating, true, handleRatingClick)}</div>
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
                <div className="comment-stars">{renderStars(c.rating)}</div>
                <p>{c.text}</p>
              </div>
            ))
          ) : (
            <p>No hay comentarios aún.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Custom;
