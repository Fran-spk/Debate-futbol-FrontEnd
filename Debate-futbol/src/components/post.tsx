import React, { useState } from "react";
import { postService } from "../services/postServices";
import { useAppSelector } from "../hooks/store";
import CommentList from "./commentList";
import { commentService } from "../services/commentServices";
import type { Comment as CommentType } from "../types/comment";



const Post = ({post,refreshPosts}: {  post: any;  refreshPosts: () => void;}) => {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const user = useAppSelector(state => state.auth.User);

  
const handleComment = async () => {
  if (!commentText.trim()) return;


    const comment = {
      postId: post._id,        // id del post actual
      userId: user?.id,        // id del usuario logueado
      content: commentText.trim() // contenido del comentario
    };

    const response = await commentService.create(comment as CommentType);

    console.log("Comentario creado:", response);
    setCommentText("");
 
};
  const isMyPost = !!post.user && post.user._id === user?.id;

  
  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que querés eliminar este post?")) return;
    try {
      const response = await postService.delete(post);
      alert(response);
      refreshPosts();
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
          {isMyPost && (
            <button
              className="btn btn-outline-danger btn-sm"
              style={{ fontSize: "0.8rem", padding: "0 0.25rem" }}
              onClick={handleDelete}
              title="Eliminar post"
            >
              Eliminar
            </button>
          )}
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
              <CommentList postId={post._id}></CommentList>
        </div>
      )}
    </div>
  );
};

export default Post;
