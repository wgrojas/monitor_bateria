import React, { useState } from "react";

function RegistrarUsuarioModal({ token, onClose }) {
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [errorRegistro, setErrorRegistro] = useState("");
  const [exitoRegistro, setExitoRegistro] = useState("");

  const handleGuardarUsuario = async () => {
    if (!nuevoUsuario || !nuevaContraseña) {
      setErrorRegistro("Debe completar todos los campos");
      setExitoRegistro("");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/usuarios/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: nuevoUsuario, contraseña: nuevaContraseña }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorRegistro(data.error || "Error al registrar usuario");
        setExitoRegistro("");
      } else {
        setExitoRegistro("Usuario registrado exitosamente");
        setErrorRegistro("");
        setNuevoUsuario("");
        setNuevaContraseña("");
        // Cerrar modal automáticamente tras 1.2 segundos
        setTimeout(() => onClose(), 1200);
      }
    } catch (err) {
      setErrorRegistro("Error de conexión al servidor");
      setExitoRegistro("");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* Cabecera con color por defecto de Bootstrap */}
          <div className="modal-header">
            <h5 className="modal-title">Registrar Nuevo Usuario</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <input
              type="text"
              placeholder="Nombre usuario"
              className="form-control mb-2"
              value={nuevoUsuario}
              onChange={(e) => setNuevoUsuario(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="form-control mb-2"
              value={nuevaContraseña}
              onChange={(e) => setNuevaContraseña(e.target.value)}
            />
            {errorRegistro && <p className="text-danger mt-2">{errorRegistro}</p>}
            {exitoRegistro && <p className="text-success mt-2">{exitoRegistro}</p>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleGuardarUsuario}>
              Guardar y Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrarUsuarioModal;