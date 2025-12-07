import type { CreatePostDTO, Post } from "../types/post";
import api from "./api";


export const postService = {
    getPosts: async (): Promise<Post[]> => {
        const response = await api.get('/posts/'); 
        return response.data as Post[];
    },
    create: async (post:CreatePostDTO): Promise<void> => {
    const response = await api.post('/posts/',post); 
    return response.data ;
    },
    delete: async (post:Post): Promise<void> => {
    const response = await api.delete(`/posts/${post._id}`);
    console.log(response);
    return response.data;
    }
    
}