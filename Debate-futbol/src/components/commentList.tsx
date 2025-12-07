import React, { useEffect, useState } from "react";
import Comment from "./comment";
import { commentService } from "../services/commentServices";
import type { Comment as CommentType } from "../types/comment";

const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data: CommentType[] = (await commentService.getComment(postId)).map((c: any) => ({
          id: c.id,
          user: c.user || { name: "Anónimo" },
          postId: c.postId,
          content: c.content,
          createdAt: c.createdAt,
        }));
        setComments(data);
      } catch (error) {
        console.error("Error cargando comentarios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  if (loading) return <p>Cargando comentarios...</p>;

  return (
    <div className="mt-2">
      {comments.length > 0 ? (
        comments.map((c) => <Comment key={c.id} comment={c} />)
      ) : (
        <p className="text-muted">No hay comentarios aún.</p>
      )}
    </div>
  );
};

export default CommentList;
