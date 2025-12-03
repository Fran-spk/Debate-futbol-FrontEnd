import type { user } from "../types/user";
import api from "./api";

interface LoginCredentials{
    email: string;
    password: string;
}

export const authService = {
    login: async(credentials: LoginCredentials) :Promise<user> =>{
        const response = await api.post('/auth/login', credentials);
        return response.data as user;
    },
    logout: async(): Promise<void>=>{
        await api.post('auth/logout');
    },
    register: async(user: user) :Promise<user> =>{
        const response = await api.post('/auth/register', user);
        return response.data as user;
    }
}