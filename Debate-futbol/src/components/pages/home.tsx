import React, { useEffect, useState } from "react";
import {postService} from "../../services/postServices";
import Post from "../post";

export const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error cargando posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Cargando posts...</p>;

  return (
    <div className="container mt-4">
<h3 className="mb-4 text-start text-success fw-bold p-6 ">
  Compartí tu opinión, aunque a nadie le importe
</h3>

      <div className="d-flex flex-column gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <><Post key={post._id} post={post} /><hr /></>
          ))
        ) : (
          <p>No hay posts disponibles.</p>
        )}
      </div>
    </div>
  );
};
