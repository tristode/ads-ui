import Comment from "@/components/comment";
import Gallery from "@/components/ui/gallery";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types";
import Author from "./author";
import Timedelta from "./ui/timedelta";
import { BsChatLeftFill } from "react-icons/bs";
import AddComment from "./add-comment";
import { FaHeart } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { useReplying } from "./single-reply-box-provider";

export default function PostCard({ post }: { post: Post }) {
  const liked = post.reactedByLoggedInUser?.includes("like");
  const replying = useReplying();

  return (
    <article className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 flex flex-col">
        <div className="flex flex-wrap space-around items-center">
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
      {/** Reactions - the like button mainly */}
      <div className="p-4 flex justify-around">
        <div className="flex flex-col items-center cursor-pointer">
          <FaHeart className={liked ? "text-red-500" : "text-gray-500"} />
          <span className="font-black text-xs text-gray-500 dark:text-gray-300">
            {post.reactions?.like || 0}
          </span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => replying.setParentId(post.id)}
        >
          <BsChatLeftFill className="text-gray-500" />
          <span className="font-black text-xs text-gray-500 dark:text-gray-300">
            {post.replies.length}
          </span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <MdShare className="text-gray-500" />
          <span className="font-black text-xs text-gray-500 dark:text-gray-300">
            Share
          </span>
        </div>
      </div>
      {(post.id === replying.parentId || !replying.parentId) && (
        <AddComment parentId={post.id} />
      )}
      {post.replies?.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </article>
  );
}
