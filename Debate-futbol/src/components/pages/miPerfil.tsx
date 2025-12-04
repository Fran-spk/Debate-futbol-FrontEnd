import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { getClubs as getTeams, type team } from "../../services/clubServices";
import { userService } from "../../services/userServicies";
import { login as loginAction } from "../../store/auth/slice";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const MiPerfil = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth.User);

  const [teams, setTeams] = useState<team[]>([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);


  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedTeam, setEditedTeam] = useState("");


  useEffect(() => {
    if (user) {
      setEditedName(user.name);
      setEditedEmail(user.email);
      setEditedTeam(user.team);
    }
  }, [user]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const resp = await getTeams();
        setTeams(resp);
      } catch (err) {
        console.error("Error cargando equipos:", err);
      } finally {
        setIsLoadingTeams(false);
      }
    };
    fetchTeams();
  }, []);

  if (!user) {
    return <p>No hay usuario autenticado.</p>;
  }

  const saveChanges = async () => {
    try {
      const payload = {
        ...user,
        name: editedName,
        email: editedEmail,
        team: editedTeam,
      };

      const response = await userService.update(payload);

      if (response) {
        dispatch(loginAction(response));
        alert("Perfil actualizado correctamente.");
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Ocurrió un error al guardar los cambios.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card text-center">
        <div className="card-header">Mi Perfil</div>

        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>

          {/* Nombre */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <strong style={{ width: "30%" }}>Nombre:</strong>
            <input
              type="text"
              className="form-control"
              style={{ width: "65%" }}
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <strong style={{ width: "30%" }}>Email:</strong>
            <input
              type="email"
              className="form-control"
              style={{ width: "65%" }}
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </div>

          {/* Equipo Favorito (select) */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <strong style={{ width: "30%" }}>Equipo Favorito:</strong>

            <select
              id="team"
              className="form-control"
              style={{ width: "65%" }}
              value={editedTeam}
              onChange={(e) => setEditedTeam(e.target.value)}
              disabled={isLoadingTeams}
            >
              <option value="">{isLoadingTeams ? "Cargando equipos..." : "Selecciona un equipo..."}</option>
              {teams.map((t) => (
                <option key={t.id} value={t.team}>
                  {t.team}
                </option>
              ))}
            </select>
          </div>
          <hr />

          <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={saveChanges}>
              Guardar cambios
            </button>

            <button
              className="btn btn-warning"
              onClick={() => {
                if (confirm("¿Confirmás dar de baja la cuenta?")) {
                  userService.delete?.(user).then(() => {
                    alert("Cuenta dada de baja.");
                    navigate("/login");
                  }).catch((err) => {
                    console.error(err);
                    alert("Error al dar de baja la cuenta.");
                  });
                }
              }}
            >
              Dar de baja cuenta
            </button>
          </div>
        </div>

        <div className="card-footer text-body-secondary">10 posteos publicados en total (traer posteos)</div>

      </div>
    </div>
  );
};
