import React, { useState } from "react";
import { postService } from "../services/postServices";

const Post = ({ post, onDelete }: { post: any, onDelete?: (id: string) => void }) => {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleComment = () => {
    if (!commentText.trim()) return;
    console.log("Comentario enviado:", commentText, "para el post", post._id);
    setCommentText("");
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que querés eliminar este post?")) return;
    try {
      await postService.delete(post._id);
      console.log("Post eliminado:", post._id);
      if (onDelete) onDelete(post._id); // Callback para actualizar UI
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  return (
    <div
      className="p-4 mb-4 rounded shadow-sm text-start" 
      style={{
        backgroundColor: "#77947bb8",
        border: "1px solid #2c2a2a",
      }}
    >
      {/* Primera línea: nombre a la izquierda, fecha + tacho a la derecha */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="badge bg-secondary">
          Posteo de {post.user?.name || "Usuario desconocido"}
        </span>

        <div className="d-flex align-items-center gap-1">
          <small className="text-muted">
            {new Date(post.createdAt).toLocaleString()}
          </small>
          <button
            className="btn btn-outline-danger btn-sm"
            style={{ fontSize: "0.8rem", padding: "0 0.25rem" }}
            onClick={handleDelete}
            title="Eliminar post"
          >
            ❌
          </button>
        </div>
      </div>

      <p className="mt-1 text-start">
        {post.team ? `Acerca de ${post.team}` : "Tema general"}
      </p>

      <p className="mt-4 fs-3">{post.content}</p>

 
      <div className="d-flex gap-2 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe un comentario..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="btn btn-success btn-sm"
          onClick={handleComment}
        >
          Comentar
        </button>
      </div>


      <div className="mt-3">
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? "Ocultar comentarios" : "Ver comentarios"}
        </button>
      </div>


      {showComments && (
        <div className="mt-2">
          {post.comments?.length > 0 ? (
            post.comments.map((c: any, index: number) => (
              <div
                key={index}
                className="p-2 my-1 rounded"
                style={{ background: "#ffffff40", border: "1px solid #333" }}
              >
                <strong>{c.user?.name || "Anónimo"}:</strong> {c.text}
              </div>
            ))
          ) : (
            <p className="text-muted">No hay comentarios aún.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
