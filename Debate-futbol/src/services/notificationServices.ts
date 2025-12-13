import type { Notification, NotificationDTO } from "../types/notification";
import api from "./api";


export const notificationService = {
    getAll: async (): Promise<Notification[]> => {
        const response = await api.get('/notifications/'); 
        console.log(response.data);
        return response.data as Notification[];
    },
    create: async (notification: NotificationDTO): Promise<void> => {
    const response = await api.post('/notifications/',notification); 
    return response.data ;
    },
    allAsRead: async (): Promise<void> => {
    const response = await api.patch('/notifications/readAll');
    return response.data;
    }
}