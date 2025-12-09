import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { getClubs as getTeams, type team } from "../../services/clubServices";
import { userService } from "../../services/userServicies";
import { login as loginAction } from "../../store/auth/slice";
import { Link, Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postService } from "../../services/postServices";
import type { Post } from "../../types/post";
import ModalDelete from "../../modals/modalDelete";   
import CardPost from "../cardPost";

export const MiPerfil = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.User);
  const [teams, setTeams] = useState<team[]>([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);

  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [showPosts, setShowPosts] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedTeam, setEditedTeam] = useState("");
  const [idUser, setIdUser] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  useEffect(() => {
  const fetchUser = async () => {
    if (userId) {
      try {
        const u = await userService.getUserById(userId);
        if (u) {
          setEditedName(u.name);
          setEditedEmail(u.email);
          setEditedTeam(u.team);
          setIdUser(u._id);
        }
      } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
      }
    } else if (user) {
      setEditedName(user.name);
      setEditedEmail(user.email);
      setEditedTeam(user.team);
      setIdUser(user._id);
    }
  };

  fetchUser();
}, [userId, user]);


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

  if (!user) return <p>No hay usuario autenticado.</p>;

  const handleLoadPosts = async () => {
    if (showPosts) {
      setShowPosts(false);
      return;
    }

    if (!idUser) return;

    setLoadingPosts(true);

    try {
      const data = await postService.getPostsByUser(idUser.toString());
      setMyPosts(data);
      setShowPosts(true);
    } catch (error) {
      alert("No se pudieron cargar los posts.");
    } finally {
      setLoadingPosts(false);
    }
  };

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

  const handleDeleteAccountConfirm = async (confirmed: boolean) => {
    setShowDeleteModal(false);

    if (!confirmed) return;

    try {
      await userService.delete(user);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error al dar de baja la cuenta.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card text-center">
        <div className="card-header">Mi Perfil</div>

        <div className="card-body">
          <h5 className="card-title">{editedName}</h5>

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
              <option value="">
                {isLoadingTeams ? "Cargando equipos..." : "Selecciona un equipo..."}
              </option>
              {teams.map((t) => (
                <option key={t.id} value={t.team}>
                  {t.team}
                </option>
              ))}
            </select>
          </div>

          <hr />
          {(idUser===user._id) &&
          <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={saveChanges}>
              Guardar cambios
            </button>

            <button
              className="btn btn-warning"
              onClick={() => setShowDeleteModal(true)} // <--- ABRE EL MODAL
            >
              Dar de baja cuenta
            </button>
          </div>
          }
          
        </div>

        <div className="card-footer text-body-secondary bg-light pt-3">
          <div className="d-flex justify-content-center gap-2 mb-4">
            <button
              className={`btn ${showPosts ? "btn-success" : "btn-outline-success"}`}
              onClick={handleLoadPosts}
              disabled={loadingPosts}
            >
              {loadingPosts
                ? "Cargando..."
                : showPosts
                ? "Ocultar Publicaciones"
                : "Publicaciones"}
            </button>
          </div>

          {showPosts && (
            <div className="text-start animated fadeIn">
              <h6 className="mb-3 border-bottom pb-2">
                Mis Posteos ({myPosts.length})
              </h6>

              {myPosts.length === 0 ? (
                <div className="alert alert-warning text-center">
                  No has publicado nada aún.
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                {myPosts.map((post) => {
                return (
                  <CardPost
                    key={post._id}
                    post={post}
                    refreshPosts={handleLoadPosts}
                  />
                );
              })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODAL CONFIRMACIÓN DE BAJA */}
      {showDeleteModal && (
        <ModalDelete onConfirm={handleDeleteAccountConfirm} />
      )}
    </div>
  );
};
