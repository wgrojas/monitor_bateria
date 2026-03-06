import React from "react";

function Header({ usuario, onLogout, onRegistrar }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 p-3 border-bottom bg-light rounded">
      {/* Nombre del usuario a la izquierda */}
      <div>
        Bienvenido, <strong>{usuario}</strong>
      </div>

      {/* Botones a la derecha */}
      <div>
        <button className="btn btn-success me-2" onClick={onRegistrar}>
          Registrar Usuario
        </button>
        <button className="btn btn-danger" onClick={onLogout}>
          Salir
        </button>
      </div>
    </div>
  );
}

export default Header;