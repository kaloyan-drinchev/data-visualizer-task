export interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

export interface User { 
    id: number,
    name: string
}

export interface AddPostFormProps {
  users: User[];
  onPostAdded: (newPost: Post) => void;
  setSuccessMessage: (msg: string) => void;
}