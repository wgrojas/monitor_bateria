import React, { useState } from "react";

function Login({ onLogin }) {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, contraseña }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Error en el login");
      } else {
        setError("");
        onLogin({
          token: data.token,
          usuario: data.usuario || nombre,
        });
      }
    } catch (err) {
      setError("Error de conexión al servidor");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg,#1f4037,#99f2c8)"
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "360px",
          borderRadius: "15px"
        }}
      >
        <div className="text-center mb-3">
          <h3>☀️ Monitor Solar</h3>
          <p className="text-muted">Sistema de monitoreo de batería</p>
        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="form-control mb-3"
          />

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Ingresar
          </button>

        </form>

        {error && (
          <div className="alert alert-danger mt-3 text-center">
            {error}
          </div>
        )}

        <div className="text-center mt-3 text-muted" style={{fontSize:"13px"}}>
          Sistema de monitoreo energético
        </div>

      </div>
    </div>
  );
}

export default Login;