import type { user } from "../types/user";
import api from "./api";


export const userService = {
    update: async (user: user): Promise<user> => {
        const response = await api.put(`/users/${user.id}`, user);
        return response.data as user;
    },

    delete: async (user: user): Promise<user> => {
        const response = await api.delete(`/users/${user.id}`);
        return response.data as user;
    },
    getUsers: async (): Promise<user[]> => {
        const response = await api.get('/users/'); 
        return response.data as user[];
    }
}