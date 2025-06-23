import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Bomberos from './Vista/Bomberos';
import Custom from './Vista/Custom';
import Company from './Vista/Company';
import Inicio from './Vista/Inicio';
import Login from './Vista/Login';
import Register from './Vista/Register';
import Admin from './Vista/Administracion';
import Productos from './Vista/Productos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/custom" element={<Custom />} /> 
        <Route path="/company" element={<Company />} /> 
        <Route path="/Bomberos" element={<Bomberos />} />
        <Route path="/Administracion" element={<Admin />} />
        <Route path="/Productos" element={<Productos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
