export type CheckmarkType = "twitter" | "discord" | "moderator";
export type ReactionType = "like";

export type User = {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  checkmarks?: CheckmarkType[];
  reactions?: { [key in ReactionType]: number };

  amFollowing?: boolean;
};

export type Comment = {
  id: string;
  content: string;

  author: User;
  postedAt: Date;

  replies?: Comment[];
  reactions?: { [key in ReactionType]: number };
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
