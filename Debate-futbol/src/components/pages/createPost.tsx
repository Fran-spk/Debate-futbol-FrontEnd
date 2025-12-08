import React, { useEffect, useState } from "react";
import { getClubs as getTeams, type team } from "../../services/clubServices";
import { postService } from "../../services/postServices";
import { useAppSelector } from "../../hooks/store";
import { useNavigate } from "react-router-dom";
import type { CreatePostDTO, Post } from "../../types/post";

export const CreatePost = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.User);

  const [content, setContent] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState<team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const resp = await getTeams();
        setTeams(resp);
      } catch (error) {
        console.error("Error cargando equipos:", error);
      } finally {
        setLoadingTeams(false);
      }
    };
    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("El contenido del post no puede estar vacío");
      return;
    }

    try {
        const post = {
            user: user?._id,
            content,
            team: selectedTeam || null
        };
      await postService.create(post as CreatePostDTO);

      alert("Post creado con éxito");
      navigate("/home");
    } catch (error) {
      console.error("Error creando post:", error);
      alert("Error al crear el post");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow-sm">
        <div className="card-header text-white bg-primary">
          <h4 className="mb-0">Crear nuevo Post</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            {/* Caja de texto */}
            <div className="mb-3">
              <label className="form-label fw-bold">Escribe tu post</label>
              <textarea
                className="form-control"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="¿Qué querés compartir?"
              />
            </div>

            {/* Combo box de equipos */}
            <div className="mb-3">
              <label className="form-label fw-bold">Equipo (opcional)</label>
              <select
                className="form-control"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                disabled={loadingTeams}
              >
                <option value="">
                  {loadingTeams ? "Cargando equipos..." : "Ninguno / General"}
                </option>

                {teams.map((t) => (
                  <option key={t.id} value={t.team}>
                    {t.team}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón enviar */}
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Publicar
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
};
