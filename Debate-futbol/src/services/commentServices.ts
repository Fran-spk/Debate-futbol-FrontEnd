import api from "./api";
import type { Comment as CommentType } from "../types/comment";


export const commentService = {
    getComment: async (postId: string): Promise<Comment[]> => {
        const response = await api.get(`/comments/${postId}`); 
        return response.data;
    },
    create: async (comment: CommentType): Promise<void> => {
    const response = await api.post('/comments/',comment); 
    return response.data ;
    },
    delete: async (comment: CommentType): Promise<void> => {
    const response = await api.delete(`/comments/${comment._id}`);
     return response.data;
    }
}