import { AddCommentArgs, Post } from "@/types";
import { User } from "@supabase/supabase-js";

// To use "useAuthSession" from "./auth.ts"

export const usePostPreview = (postId: string): Post | null => null;
// Loads all comments
export const usePost = (postId: string): Post | null => null;
export const useComment = (commentId: string): Comment | null => null;
export const useUser = (userId: string): User | null => null;

export const setLike = (postId: string): void => undefined;
export const reply = (parentId: string, args: AddCommentArgs): void =>
  undefined;
