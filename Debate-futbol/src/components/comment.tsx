import { useState } from "react";
import type { Comment as CommentType } from "../types/comment";
import { useAppSelector } from "../hooks/store";
import { commentService } from "../services/commentServices";
import ModalDelete from "../modals/modalDelete";

interface CommentProps {
  comment: CommentType;
  refreshComments?: () => void;
}

const Comment = ({ comment, refreshComments }: CommentProps) => {
  const user = useAppSelector(state => state.auth.User);
  const [showModal, setShowModal] = useState(false);

  const isMyComment = comment.user?._id === user?._id  ||
  user?.permissions?.includes("admin");;

  const handleModalConfirm = async (confirmed: boolean) => {
    setShowModal(false); 

    if (!confirmed) return;

    try {
      await commentService.delete(comment);
      refreshComments?.();
    } catch (err) {
      console.error("Error eliminando comentario:", err);

    }
  };

  return (
    <>
      <div
        className="p-2 my-1 rounded d-flex justify-content-between align-items-center"
        style={{ background: "#ffffff40", border: "1px solid #333" }}
      >
        <span>
          <strong>{comment.user?.name || "Anónimo"}:</strong> {comment.content}
        </span>

        {isMyComment && (
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-sm btn-outline-danger"
            style={{ padding: "0 6px", fontSize: "0.7rem", lineHeight: 1 }}
            title="Eliminar comentario"
          >
            ×
          </button>
        )}
      </div>

      {showModal && <ModalDelete onConfirm={handleModalConfirm} />}
    </>
  );
};

export default Comment;
