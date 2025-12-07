import React from "react";
import type { Comment as CommentType } from "../types/comment"; // <-- renombrado
interface CommentProps {
  comment: CommentType; // usa el tipo renombrado
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div
      className="p-2 my-1 rounded"
      style={{ background: "#ffffff40", border: "1px solid #333" }}
    >
      <strong>{comment.user?.name || "Anónimo"}:</strong> {comment.content}
    </div>
  );
};

export default Comment;
