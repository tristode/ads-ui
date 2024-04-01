import Comment from "@/components/comment";
import Gallery from "@/components/ui/gallery";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types";
import Author from "./author";
import Timedelta from "./ui/timedelta";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 flex flex-col">
        <div className="flex space-around items-center">
          <Author user={post.author}>
            <Timedelta dateTime={post.postedAt} />
          </Author>
          {post.badges && (
            <div className="flex space-x-2 ml-auto">
              {post.badges.map((badge) => (
                <Badge
                  key={badge}
                  className="text-gray-500 dark:text-gray-300 bg-gray-300 dark:bg-gray-500"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
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
