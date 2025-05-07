import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Vista/Login';
import Register from './Vista/Register';
import Inicio from './Vista/Inicio';
import Custom from './Vista/Custom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/custom" element={<Custom />} /> 
        {/* Aquí puedes agregar más rutas en el futuro */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;