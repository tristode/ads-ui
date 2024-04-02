export type CheckmarkType = "twitter" | "discord" | "moderator";
export type ReactionType = "like";

export type User = {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  checkmarks?: CheckmarkType[];

  amFollowing?: boolean;
};

export type Comment = {
  id: string;
  permalink: string;

  content: string;

  author: User;
  postedAt: Date;

  replies?: Comment[];
  reactions?: { [key in ReactionType]: number };
  reactedByLoggedInUser?: ReactionType[];
};

export type Post = {
  id: string;
  permalink: string;

  title: string;
  badges?: string[];
  content: string;
  images?: string[];

  author: User;
  postedAt: Date;

  replies: Comment[];
  reactions?: { [key in ReactionType]: number };
  reactedByLoggedInUser?: ReactionType[];
};
