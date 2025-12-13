import React, { useEffect, useState } from "react";
import { postService } from "../../services/postServices";
import Post from "../cardPost";

export const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshPosts = async () => {
    try {
      const data = await postService.getPosts();
  console.log(data);
      setPosts(data);
    } catch (error) {
      console.error("Error al refrescar los posts:", error);
    }
  };

  useEffect(() => {
    refreshPosts().finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando posts...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-start text-success fw-bold p-6 mt-5">
        Debates futbolísticos
      </h3>

      <div className="d-flex flex-column gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
          <Post 
            key={post._id}
            post={post}
            refreshPosts={refreshPosts}
          />
        ))

        ) : (
          <p>No hay posts disponibles.</p>
        )}
      </div>
    </div>
  );
};
