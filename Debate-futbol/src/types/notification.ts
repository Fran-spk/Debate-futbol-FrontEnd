export type Notification = {
  id: string;
  userSend: {
    _id: string;
    name: string;
  };
  date: string; 
  post: string;
  type: string;
};

export type NotificationDTO = {
    postId: string;
    userId: string;
    type: EnumNotification;
};

export type EnumNotification = 'Like' | 'Comment';