
export interface Comment {
  _id?: string;
  user?: { _id: string; name: string }; 
  postId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}
