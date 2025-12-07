
export interface Comment {
  id?: string;
  user?: { id: string; name: string }; 
  postId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}
