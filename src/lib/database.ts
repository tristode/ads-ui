import { AddCommentArgs, Comment, Post } from "@/types";
import { useAuthSession } from "./auth";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { User } from "../types";
import { NewPostForm } from "@/types";
import { z } from "zod";
import { Session } from "@supabase/supabase-js";

export const usePostPreview = (postId: string): Post | null => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPost().catch(console.error);
  }, []);

  const fetchPost = async () => {
    let { data: postData, error } = await supabase
      .from("Post")
      .select(
        `
                *,
                UserData!public_Post_author_fkey(*),
                Comment(*),
                PostLikes(*)
                `
      )
      // .or("Users.id.eq.Comments.id")
      // .eq("Comment.parentPost", "id")
      // .eq("PostLikes.postId", "id")
      // .eq("CommentLikes.commentId", "Comment.id")
      .eq("id", postId)
      .single();

    let parser = z.object({
      id: z.string(),
      title: z.string(),
      badges: z.array(z.string()).nullable().default(null),
      content: z.string(),
      images: z.array(z.string()),
      author: z.string(),
      postedAt: z.preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val),
        z.date()
      ),
      UserData: z.object({
        id: z.string(),
        handle: z.string(),
        name: z.string(),
        bio: z.string(),
        avatar: z.string(),
      }),
      Comments: z
        .array(
          z.object({
            id: z.string(),
            content: z.string(),
            author: z.string(),
            postedAt: z.date(),
          })
        )
        .default([]),
      PostLikes: z
        .array(
          z.object({
            postId: z.string(),
            userId: z.string(),
          })
        )
        .nullable()
        .default(null),
      CommentLikes: z
        .array(
          z.object({
            commentId: z.string(),
            userId: z.string(),
          })
        )
        .nullable()
        .default(null),
    });
    let parsedData = parser.parse(postData);

    if (error) {
      console.error(error);
    }
    const author = parsedData.UserData;
    if (!postData || !author) {
      console.error("Could not fetch post data");
      return;
    }

    const getReplies = (id: string): Comment[] =>
      parsedData.Comments.filter((comment) => comment.id == id)
        .map((comment): Comment | null => {
          const author = null; // TODO
          if (!author) {
            return null;
          }
          return {
            id: comment.id,
            content: comment.content,
            postedAt: comment.postedAt,
            author: author,
            replies: getReplies(comment.id),
            permalink: "",
          };
        })
        .filter((comment): comment is Comment => comment !== null);

    setPost({
      id: parsedData.id,
      title: parsedData.title,
      badges: parsedData.badges ?? [],
      content: parsedData.content,
      images: parsedData.images,
      author: author,
      postedAt: parsedData.postedAt,
      replies: getReplies(parsedData.id),
      permalink: "",
    });
  };

  return post;
};

const loggedInUserIsFollowing = async (
  session: Session | null,
  userId: string
) => {
  if (!session) {
    return false;
  }

  const { data: amFollowing, error } = await supabase
    .from("UserFollows")
    .select()
    .eq("follower", session.user.id)
    .eq("followed", userId);

  if (error) {
    console.error("Error gettig user data: ", error);
  }
  if (error || !amFollowing?.length) {
    return false;
  }

  return true;
};

const fetchUser = async (
  userId: string,
  session: Session | null
): Promise<User | null> => {
  if (!userId) {
    return null;
  }

  const [{ data: userData, error }, amFollowing] = await Promise.all([
    supabase.from("UserData").select().eq("id", userId).single(),
    loggedInUserIsFollowing(session, userId),
  ]);

  if (error) {
    console.error("Error getting user data: ", error);
  }

  return {
    ...userData,
    amFollowing,
  };
};

export const usePost = (postId: string): Post | null => null;
export const useComment = (commentId: string): Comment | null => null;
export const useUser = (userId: string): User | null => {
  const session = useAuthSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const retrieved = await fetchUser(userId, session).catch(console.error);
      retrieved && setUser(retrieved);
    };
    fetcher();
  }, [userId, session]);

  return user;
};

export const setLike = async (postId: string): Promise<void> => undefined;
export const reply = async (
  parentId: string,
  args: AddCommentArgs
): Promise<void> => undefined;

export const createPost = async (post: NewPostForm) => {
  const session = useAuthSession();
  if (!session) {
    return;
  }

  const { error } = await supabase.from("Posts").insert({
    title: post.title,
    badges: post.badges ?? [],
    content: post.content,
    images: post.images ?? [],
    author: post.author.id,
    postedAt: post.postedAt,
  });

  if (error) {
    console.error("Failed to upload post: ", error);
  }
};
