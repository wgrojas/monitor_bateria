import React, { useEffect, useState } from "react";

import API from "./services/api";

import GraficaSistema from "./components/GraficaSistema";
import TablaDatos from "./components/TablaDatos";
import Battery from "./components/Battery";
import Login from "./components/Login";
import Header from "./components/Header"; 
import RegistrarUsuarioModal from "./components/RegistrarUsuarioModal"; // modal separado

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [datos, setDatos] = useState([]);
  const [voltajeActual, setVoltajeActual] = useState(0);
  const [auth, setAuth] = useState(null); // {token, usuario}

  const [showModal, setShowModal] = useState(false); // controlar modal

  const cargarDatos = () => {
    if (!auth?.token) return;

    API.get("/datos", {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => {
        setDatos(res.data);
        if (res.data.length > 0) setVoltajeActual(res.data[0].voltaje);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (auth?.token) {
      cargarDatos();
      const intervalo = setInterval(() => cargarDatos(), 5000);
      return () => clearInterval(intervalo);
    }
  }, [auth]);

  const handleLogout = () => setAuth(null);
  const handleRegistrar = () => setShowModal(true); // abrir modal

  if (!auth) return <Login onLogin={setAuth} />;

  return (
    <div className="container mt-4">
      {/* HEADER con usuario y botones */}
      <Header
        usuario={auth.usuario} // <-- el nombre del usuario
        onLogout={handleLogout}
        onRegistrar={handleRegistrar}
      />

      <h2 className="text-center mb-4">☀️ Monitor Sistema Solar</h2>

      {/* BATERIA */}
      <div className="d-flex justify-content-center mb-4">
        <Battery voltage={voltajeActual} />
      </div>

      {/* GRAFICA */}
      <GraficaSistema datos={datos} />

      {/* TABLA */}
      <TablaDatos datos={datos} />

      {/* MODAL DE REGISTRO */}
      {showModal && (
        <RegistrarUsuarioModal
          token={auth.token}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;