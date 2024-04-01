export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Comment = {
  id: string;
  content: string;
  author: User;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  images?: string[];
  author: User;
  comments: Comment[];
};
