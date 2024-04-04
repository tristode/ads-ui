import { AddCommentArgs, Post } from "@/types";
import { useAuthSession } from "./auth";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { User } from "../types";
import { NewPostForm } from "@/types";
import { z } from "zod";

// To use "useAuthSession" from "./auth.ts"
export const usePostPreview = (postId: string): Post | null => {
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        fetchPost().catch(console.error);
    }, []);


    const fetchPost = async () => {
        let { data: postData, error } = await supabase
            .from("posts")
            .select(
                `
                *,
                Users(*),
                Comments(*),
                PostLikes(*),
                CommentLikes(*)
                `
            )
            .eq("Users.id", "author")
            .or("Users.id.eq.Comments.id")
            .eq("Comments.parentPost", "id")
            .eq("PostLikes.postId", "id")
            .eq("CommentLikes.commentId", "Comments.id")
            .eq("Posts.id", postId)
            .single();

        let parser = z.object({
            id: z.string(),
            title: z.string(),
            badges: z.array(z.string()),
            content: z.string(),
            images: z.array(z.string()),
            author: z.string(),
            postedAt: z.date(),
            Users: z.array(z.object(
                {
                    id: z.string(),
                    handle: z.string(),
                    name: z.string(),
                    bio: z.string(),
                    avatar: z.string(),
                }
            )),
            Comments: z.array(z.object({
                id: z.string(),
                content: z.string(),
                author: z.string(),
                postedAt: z.date(),
            })),
            PostLikes: z.array(z.object({
                postId: z.string(),
                userId: z.string(),

            })),
            CommentLikes: z.array(z.object({
                commentId: z.string(),
                userId: z.string(),

            })),
        });
        let parsedData = parser.parse(postData);

        if (error) { console.error(error); }
        const author = parsedData.Users.find(elem => elem.id === parsedData.author);
        if (!postData || !author) { console.error("Could not fetch post data"); return; }

        const getReplies = (id: string): Comment[] => {
            return parsedData.Comments
                .filter(comment => comment.id == id)
                .map(
                    comment => {
                        const author = parsedData.Users.find(elem => elem.id === parsedData.author);
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
                    }
                )
                .filter(comment => comment !== null);
        }

        setPost(
            {
                id: parsedData.id,
                title: parsedData.title,
                badges: parsedData.badges,
                content: parsedData.content,
                images: parsedData.images,
                author: author,
                postedAt: parsedData.postedAt,
                replies: getReplies(parsedData.id),
            }
        );
    };

    return post;
};

// Loads all comments
export const usePost = (postId: string): Post | null => null;
export const useComment = (commentId: string): Comment | null => null;
export const useUser = (userId: string): User | null => {
    const session = useAuthSession();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUser().catch(console.error);
    }, []);

    const fetchUser = async () => {
        if (!userId) { return; }

        const { data: userData, error } = await supabase
            .from("Users")
            .select()
            .eq("id", userId)
            .single();

        if (error) { console.error("Error getting user data: ", error); }
        if (!userData?.length) { console.error("No such user!"); return; }

        setUser({
            ...userData,
            amFollowing: await loggedInUserIsFollowing(),
        });
    };

    const loggedInUserIsFollowing = async () => {
        if (!session) { return false; }


        const { data: amFollowing, error } = await supabase
            .from("UserFollows")
            .select()
            .eq("follower", session.user.id)
            .eq("followed", userId);

        if (error) { console.error("Error gettig user data: ", error); }
        if (error || !amFollowing?.length) { return false; }

        return true;
    };

    return user;
}

export const setLike = (postId: string): void => undefined;
export const reply = (parentId: string, args: AddCommentArgs): void =>
    undefined;

export const createPost = (post: NewPostForm) => {
    const session = useAuthSession();
    if (!session) { return; }

    const { error } = await supabase
        .from("Posts")
        .insert({
            title: post.title,
            badges: post.badges ?? [],
            content: post.content,
            images: post.images ?? [],
            author: post.author.id,
            postedAt: post.postedAt,
        })

    if (error) { console.error("Failed to upload post: ", error); }
}
