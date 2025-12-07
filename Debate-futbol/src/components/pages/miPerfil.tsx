import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { getClubs as getTeams, type team } from "../../services/clubServices";
import { userService } from "../../services/userServicies";
import { login as loginAction } from "../../store/auth/slice";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { postService } from "../../services/postServices";
import type { Post as postType } from "../../types/post";
import Post from "../post";

export const MiPerfil = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth.User);

  const [teams, setTeams] = useState<team[]>([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);


  const [myPosts, setMyPosts] = useState<postType[]>([]);
  const [showPosts, setShowPosts] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false); 
  
  
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
  
  
  const handleLoadPosts = async() =>{

    if (showPosts){
      setShowPosts(false);
      return
    }
  
    const userId = user?.id
    if(!userId) return

    setLoadingPosts(true);

    try {

      const data = await postService.getPostsByUser(userId.toString());

      setMyPosts(data);
      setShowPosts(true);
      
    } catch (error) {
      alert("No se pudieron cargar los posts.")      
    
    } finally{  
      setLoadingPosts(false);
    }
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

        {/* Posteos */}
        <div className="card-footer text-body-secondary bg-light pt-3">            
            <div className="d-flex justify-content-center gap-2 mb-4">
                <button 
                    className={`btn ${showPosts ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={handleLoadPosts}
                    disabled={loadingPosts}
                >
                    {loadingPosts ? "Cargando..." : (showPosts ? "Ocultar Publicaciones" : "Mis Publicaciones")}
                </button>
            </div>
            {showPosts && (
                <div className="text-start animated fadeIn">
                     <h6 className="mb-3 border-bottom pb-2">Mis Posteos ({myPosts.length})</h6>
                     
                     {myPosts.length === 0 ? (
                        <div className="alert alert-warning text-center">No has publicado nada aún.</div>
                     ) : (
                        <div className="d-flex flex-column gap-3">
                            {myPosts.map(post => (
                                <Post 
                                    key={post._id} 
                                    post={post} 
                                    refreshPosts={handleLoadPosts} 
                                />
                            ))}
                        </div>
                     )}
                </div>
            )}

        </div>

      </div>
    </div>
  );
};
