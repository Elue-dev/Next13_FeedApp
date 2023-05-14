export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: {
    name: string;
    email: string;
  };
}

export interface postDetails {
  title: string;
  content: string;
}
