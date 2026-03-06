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
        // Ahora enviamos token y nombre del usuario
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
    <div className="d-flex flex-column align-items-center mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <input
          type="text"
          placeholder="Usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}

export default Login;
