import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Bomberos from './Vista/Bomberos';
import Custom from './Vista/Custom';
import Inicio from './Vista/Inicio';
import Login from './Vista/Login';
import Register from './Vista/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/custom" element={<Custom />} /> 
        <Route path="/Bomberos" element={<Bomberos/>} />
        {/* Aquí puedes agregar más rutas en el futuro */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;