import React, { useState } from 'react';
import './Style/StyleCustom.css';

const Custom = () => {
  const [selectedModel, setSelectedModel] = useState('model1'); // Modelo seleccionado
  const [shirtName, setShirtName] = useState('');
  const [shirtNumber, setShirtNumber] = useState('');
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState(null);

  // Función para manejar la subida de imágenes (por el momento no funcional)
  const handleImageUpload = (e) => {
    // Aquí podrías agregar lógica para cargar imágenes si fuera necesario
    alert('Imagen subida (funcionalidad no implementada)');
  };

  // Función para manejar el cambio de nombre y número
  const handleNameChange = (e) => setShirtName(e.target.value);
  const handleNumberChange = (e) => setShirtNumber(e.target.value);

  // Función para agregar comentarios
  const handleAddComment = (e) => {
    e.preventDefault();
    if (e.target.comment.value.trim()) {
      setComments([...comments, e.target.comment.value]);
      e.target.comment.value = ''; // Limpiar campo de comentario
    }
  };

  return (
    <div className="custom-container">
      <h1 className="custom-header">Personalización de Camisetas</h1>

      <div className="custom-main">
        {/* Cuadro donde se muestra la camiseta seleccionada */}
        <div className="shirt-display">
          <div className={`shirt-preview ${selectedModel}`}>
            {image && <img src={image} alt="Camiseta" className="shirt-image" />}
            <div className="shirt-details">
              <p className="shirt-name">{shirtName || 'Nombre de camiseta'}</p>
              <p className="shirt-number">{shirtNumber || 'Número'}</p>
            </div>
          </div>
        </div>

        {/* Opciones de modelos */}
        <div className="models">
          <h3>Selecciona un Modelo</h3>
          <div className="model-buttons">
            <button onClick={() => setSelectedModel('model1')} className="model-button">Modelo 1</button>
            <button onClick={() => setSelectedModel('model2')} className="model-button">Modelo 2</button>
            <button onClick={() => setSelectedModel('model3')} className="model-button">Modelo 3</button>
          </div>
        </div>

        {/* Zona de personalización (izquierda) */}
        <div className="customize-options">
          <div className="upload-section">
            <button onClick={handleImageUpload} className="upload-button">Subir Imagen</button>
          </div>
          <div className="edit-section">
            <input
              type="text"
              placeholder="Nombre de la camiseta"
              value={shirtName}
              onChange={handleNameChange}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Número"
              value={shirtNumber}
              onChange={handleNumberChange}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Zona de comentarios */}
      <div className="comments-section">
        <h2>Comentarios</h2>
        <form onSubmit={handleAddComment}>
          <textarea
            name="comment"
            placeholder="Deja un comentario..."
            rows="4"
            className="comment-textarea"
          />
          <button type="submit" className="comment-button">Agregar Comentario</button>
        </form>

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment, index) => <p key={index} className="comment">{comment}</p>)
          ) : (
            <p>No hay comentarios aún.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Custom;