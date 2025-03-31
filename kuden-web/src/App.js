import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Vista/Login';
import Register from './Vista/Register';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Aquí puedes agregar más rutas en el futuro */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;