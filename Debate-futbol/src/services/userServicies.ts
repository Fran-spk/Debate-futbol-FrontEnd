import type { user } from "../types/user";
import api from "./api";


export const userService = {
    update: async (user: user): Promise<user> => {
        const response = await api.put(`/users/${user._id}`, user);
        return response.data as user;
    },

    delete: async (user: user): Promise<user> => {
        const response = await api.delete(`/users/${user._id}`);
        return response.data as user;
    },
    getUsers: async (): Promise<user[]> => {
        const response = await api.get('/users/'); 
        return response.data as user[];
    },
    getUserById: async (_id:string): Promise<user> => {
        const response = await api.get(`/users/${_id}`); 
        return response.data as user;
    },

    activeUser: async (user: user): Promise<user> => {
        const response = await api.patch(`/users/${user._id}/activate`);
        return response.data as user;
    }

}