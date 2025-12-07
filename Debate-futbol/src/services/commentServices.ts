import api from "./api";
import type { Comment as CommentType } from "../types/comment";


export const commentService = {
    getComment: async (postId: string): Promise<Comment[]> => {
        const response = await api.get(`/comments/${postId}`); 
        return response.data as Comment[];
    },
    create: async (comment: CommentType): Promise<void> => {
    const response = await api.post('/comments/',comment); 
    console.log(comment);
    return response.data ;
    }    
}