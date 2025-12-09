import type { User } from "../types/user";
import api from "./api";


export const userService = {
    update: async (user: User): Promise<User> => {
        const response = await api.put(`/users/${user._id}`, user);
        return response.data as User;
    },
    delete: async (user: User): Promise<User> => {
        const response = await api.delete(`/users/${user._id}`);
        return response.data as User;
    },
    getUsers: async (): Promise<User[]> => {
        const response = await api.get('/users/'); 
        return response.data as User[];
    },
    getUserById: async (_id:string): Promise<User> => {
        const response = await api.get(`/users/${_id}`); 
        return response.data as User;
    },
    activeUser: async (user: User): Promise<User> => {
        const response = await api.patch(`/users/${user._id}/activate`);
        return response.data as User;
    }
}