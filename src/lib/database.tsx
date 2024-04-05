import { AddCommentArgs, Comment, Post } from "@/types";
import { signIn, useAuthSession } from "./auth";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { User } from "../types";
import { NewPostForm } from "@/types";
import { z } from "zod";
import { Session } from "@supabase/supabase-js";

type Cache = {
  users: Record<string, User>;
  setUsers: (
    users:
      | ((users: Record<string, User>) => Record<string, User>)
      | Record<string, User>
  ) => void;
  posts: Record<string, Post>;
  setPosts: (
    posts:
      | ((posts: Record<string, Post>) => Record<string, Post>)
      | Record<string, Post>
  ) => void;
};

const CacheContext = createContext<Cache | null>(null);

export function DataProvider({
  children,
  ...props
}: React.PropsWithChildren<{}>) {
  const [users, setUsers] = useState<Record<string, User>>({});
  const [posts, setPosts] = useState<Record<string, Post>>({});

  const value = {
    users,
    setUsers,
    posts,
    setPosts,
  };

  return (
    <CacheContext.Provider {...props} value={value}>
      {children}
    </CacheContext.Provider>
  );
}

const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error("useCache must be used within a DataProvider");
  }
  return context;
};

const fetchPost = async (postId: string): Promise<Post> => {
  let { data: postData, error } = await supabase
    .from("Post")
    .select(
      `
                *,
                UserData!public_Post_author_fkey(*),
                Comment(*, UserData!public_Comment_author_fkey(*)),
                PostLikes(*)
                `
    )
    // .or("Users.id.eq.Comments.id")
    // .eq("PostLikes.postId", "id")
    // .eq("CommentLikes.commentId", "Comment.id")
    .eq("id", postId)
    .eq("Comment.parentPost", postId)
    .single();

  if (error) {
    console.error("Error getting post data: ", error);
  }

  let parser = z.object({
    id: z.string(),
    title: z.string(),
    badges: z.array(z.string()).nullable().default(null),
    content: z.string(),
    images: z.array(z.string()),
    author: z.string(),
    posted_at: z.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date()
    ),
    UserData: z.object({
      id: z.string(),
      handle: z.string(),
      name: z.string(),
      bio: z.string().nullable(),
      avatar: z.string(),
    }),
    Comment: z
      .array(
        z.object({
          id: z.string(),
          content: z.string(),
          author: z.string(),
          posted_at: z.preprocess(
            (val) => (typeof val === "string" ? new Date(val) : val),
            z.date()
          ),
          parentComment: z.string().nullable(),
          UserData: z.object({
            id: z.string(),
            handle: z.string(),
            name: z.string(),
            bio: z.string().nullable(),
            avatar: z.string(),
          }),
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
    throw new Error("Post not found");
  }

  const getReplies = (parentId: string | null): Comment[] =>
    parsedData.Comment.filter((comment) => comment.parentComment === parentId)
      .map((comment): Comment | null => {
        const author = comment.UserData;
        return {
          id: comment.id,
          content: comment.content,
          postedAt: comment.posted_at,
          author: {
            id: author.id,
            handle: author.handle,
            name: author.name,
            avatar: author.avatar,
            bio: author.bio || undefined,
          },
          replies: getReplies(comment.id),
          permalink: "",
        };
      })
      .filter((comment): comment is Comment => comment !== null);

  return {
    id: parsedData.id,
    title: parsedData.title,
    badges: parsedData.badges ?? [],
    content: parsedData.content,
    images: parsedData.images,
    author: {
      id: author.id,
      handle: author.handle,
      name: author.name,
      avatar: author.avatar,
      bio: author.bio || undefined,
    },
    postedAt: parsedData.posted_at,
    replies: getReplies(null),
    permalink: "",
  };
};

export const usePostPreview = (postId: string): Post | null => {
  const { posts, setPosts } = useCache();

  useEffect(() => {
    if (posts[postId]) {
      return;
    }
    const fetcher = async () => {
      const post = await fetchPost(postId);
      console.log("Post: ", post);
      setPosts((posts) => ({ ...posts, [postId]: post }));
    };
    fetcher();
  }, [postId, posts, setPosts]);

  return posts[postId] ?? null;
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
  const { users, setUsers } = useCache();

  useEffect(() => {
    const fetcher = async () => {
      if (users[userId]) {
        return;
      }
      const retrieved = await fetchUser(userId, session).catch(console.error);
      retrieved && setUsers((users) => ({ ...users, [userId]: retrieved }));
    };
    fetcher();
  }, [userId, session]);

  return users[userId] ?? null;
};

export const setLike = async (postId: string): Promise<void> => undefined;

const replySchema = z.object({
  id: z.string(),
  content: z.string(),
  posted_at: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
});

const reply = async (
  session: Session,
  args: AddCommentArgs
): Promise<z.infer<typeof replySchema>> => {
  const { data: comment, error } = await supabase
    .from("Comment")
    .insert({
      author: session.user.id,
      content: args.content,
      parentPost: args.postId,
      parentComment: args.parentId,
    })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return replySchema.parse(comment && comment[0]);
};

const withReply = (
  replies: Comment[],
  parentId: string | null,
  reply: z.infer<typeof replySchema>,
  me: User
): Comment[] =>
  parentId === null
    ? [
        ...replies,
        {
          id: reply.id,
          content: reply.content,
          postedAt: reply.posted_at,
          author: me,
          permalink: "",
        },
      ]
    : replies.map((comment) => {
        if (comment.id !== parentId) {
          return comment;
        }

        return {
          ...comment,
          replies: withReply(comment.replies || [], null, reply, me),
        };
      });

export const useReplier = (): ((args: AddCommentArgs) => Promise<void>) => {
  const session = useAuthSession();
  const { setPosts } = useCache();
  const me = useUser(session?.user.id ?? "");

  if (!session) return async () => signIn();
  if (!me) return async () => undefined;

  return async (args: AddCommentArgs) => {
    const posted = await reply(session, args);

    setPosts((posts) => {
      const post = posts[args.postId];
      if (!post) {
        return posts;
      }

      return {
        ...posts,
        [args.postId]: {
          ...post,
          replies: withReply(post.replies, args.parentId, posted, me),
        },
      };
    });
  };
};

export const createPost = async (post: NewPostForm) => {
  const { error } = await supabase.from("Posts").insert({
    title: post.title,
    badges: post.badges ?? [],
    content: post.content,
    images: post.images ?? [],
    author: post.author.id,
    posted_at: post.postedAt,
  });

  if (error) {
    console.error("Failed to upload post: ", error);
  }
};
