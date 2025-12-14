import type { Post } from "../types/post";
import type { User } from "../types/user";
import api from "./api";


interface LoginCredentials{
    email: string;
    password: string;
}

export const authService = {
    login: async(credentials: LoginCredentials) :Promise<User> =>{
        const response = await api.post('/auth/login', credentials);
        return response.data as User;
    },
    logout: async(): Promise<void>=>{
        await api.post('auth/logout');
    },
    register: async(user: User) :Promise<User> =>{
        const response = await api.post('/auth/register', user);
        return response.data as User;
    },
    getMe:  async() :Promise<User> =>{
    const response = await api.get("/auth/me", {
      withCredentials: true,  
    });
    return response.data;
    },
    isLiked:  async(post:Post) : Promise<boolean> =>{
    const response = await api.get(`/auth/isLike/${post._id}`, {
    });
    return response.data.liked;
    },

    googleLogin: async(firebaseToken: string): Promise<User> => {

        const response = await api.post(
            'auth/google',
            { firebaseToken }
        );
        return response.data;
    }
};
