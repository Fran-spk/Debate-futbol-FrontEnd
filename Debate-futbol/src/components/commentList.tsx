import { useEffect, useState } from "react";
import Comment from "./comment";
import { commentService } from "../services/commentServices";
import type { Comment as CommentType } from "../types/comment";

const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  // LA función que refresca comentarios
  const loadComments = async () => {
    try {
      const data = (await commentService.getComment(postId)).map((c: any) => ({
        _id: c?._id ?? "",
        user: c?.user ?? { name: "Anónimo" },
        postId: c?.postId ?? "",
        content: c?.content ?? "",
        createdAt: c?.createdAt ?? "",
      })) as CommentType[];

      setComments(data);
    } catch (error) {
      console.error("Error cargando comentarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  if (loading) return <p>Cargando comentarios...</p>;

  return (
    <div className="mt-2">
      {comments.length > 0 ? (
        comments.map((c) => (
          <Comment 
            key={c._id} 
            comment={c} 
            refreshComments={loadComments}
          />
        ))
      ) : (
        <p className="text-muted">No hay comentarios aún.</p>
      )}
    </div>
  );
};

export default CommentList;
