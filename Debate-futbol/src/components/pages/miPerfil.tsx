import React from "react";
import { useAppSelector } from '../../hooks/store';

export const MiPerfil = () => {
   const user = useAppSelector(state=> state.auth.User);

  if (!user) {
    return <p>No hay usuario autenticado.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card text-center">
        <div className="card-header">
          Mi Perfil
        </div>

        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">
            <strong>Usuario:</strong> {user.name}<br />
            <strong>Email:</strong> {user.email}<br />
            <strong>Permisos:</strong> {user.permissionLevel.join(", ")}
            <strong>Hincha de {user.team}</strong>
          </p>

          <a href="#" className="btn btn-primary">
            Editar perfil
          </a>
          <a href="#" className="btn btn-warning">
            Dar de baja cuenta
          </a>
        </div>

        <div className="card-footer text-body-secondary">
          10 posteos publicados en total
        </div>
      </div>
    </div>
  );
};


