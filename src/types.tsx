export type CheckmarkType = "twitter" | "discord" | "moderator";

export type User = {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  checkmarks?: CheckmarkType[];
};

export type Comment = {
  id: string;
  content: string;

  author: User;
  postedAt: Date;
};

export type Post = {
  id: string;
  title: string;
  badges?: string[];
  content: string;
  images?: string[];

  author: User;
  postedAt: Date;

  comments: Comment[];
};
