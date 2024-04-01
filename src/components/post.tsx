import User from "@/components/user";
import Comment from "@/components/comment";
import Gallery from "@/components/ui/gallery";
import { Post } from "@/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4">
        <User user={post.author} />
        <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
        {post.images && post.images.length > 0 && (
          <Gallery images={post.images} />
        )}
        <div className="mt-3 space-y-2">{post.content}</div>
      </div>
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </article>
  );
}
