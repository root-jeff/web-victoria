import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./views/Login";
//import { Dashboard } from './views/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Importa tu archivo index.scss
//import PolygonCreator from './components/PoligonCreator';
import { Register } from "./views/Register";
const App: React.FC = () => {
  return (
    <Router>
      <h1>Menu component</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<p>Not foud</p>} />
        {/* <Route path="/" element={<PolygonCreator />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Otras rutas y elementos se agregarían aquí */}
      </Routes>
    </Router>
  );
};

export default App;
