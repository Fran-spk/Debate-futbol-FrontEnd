
export interface CreatePostDTO {
  user?: string;             
  content: string;
  team?: string | null;
}


export interface Post {
  _id: string;
  user: { _id: string; name: string }; 
  content: string;
  team?: string | null;
  createdAt: string;
  updatedAt?: string;
  countLikes: number;  
}
