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
import { ShareButton } from "./ui/share-button";
import { useUser } from "@/lib/database";

export default function PostCard({
  post,
  exclusive,
}: {
  post: Post;
  exclusive?: boolean;
}) {
  const liked = post.reactedByLoggedInUser?.includes("like");
  const replying = useReplying();
  const author = useUser(post.authorId);

  return (
    <>
      <article className="mx-auto max-w-2xl w-full overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        <div className="flex flex-col p-4">
          <div className="space-around flex flex-wrap items-center">
            {author && (
              <Author user={author}>
                <Timedelta dateTime={post.postedAt} />
              </Author>
            )}
            {post.badges && (
              <div className="ml-auto flex space-x-2">
                {post.badges.map((badge) => (
                  <Badge
                    key={badge}
                    className="bg-gray-300 text-gray-500 dark:bg-gray-500 dark:text-gray-300"
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
        <div className="flex justify-around p-4">
          <div className="flex w-full cursor-pointer flex-col items-center">
            <FaHeart className={liked ? "text-red-500" : "text-gray-500"} />
            <span className="text-xs font-black text-gray-500 dark:text-gray-300">
              {post.reactions?.like || 0}
            </span>
          </div>
          <div
            className="flex w-full cursor-pointer flex-col items-center"
            onClick={() => replying.setParentId(post.id)}
          >
            <BsChatLeftFill className="text-gray-500" />
            <span className="text-xs font-black text-gray-500 dark:text-gray-300">
              {post.replyCount || post.replies.length}
            </span>
          </div>
          <ShareButton
            shareUrl={new URL(post.permalink, window.location.origin).href}
            variant="none"
            size="none"
            styling="unstyled"
            title={post.title}
            asChild
          >
            <div className="flex w-full cursor-pointer flex-col items-center">
              <MdShare className="text-gray-500" />
              <span className="text-xs font-black text-gray-500 dark:text-gray-300">
                Share
              </span>
            </div>
          </ShareButton>
        </div>
        <AddComment
          postId={post.id}
          parentId={null}
          className={
            post.id === replying.parentId || (exclusive && !replying.parentId)
              ? ""
              : "hidden sm:block"
          }
          parentAuthorHandle={exclusive ? undefined : author?.handle}
          onCancel={() => replying.setParentId(undefined)}
        />
        {post.replies?.map((reply) => (
          <Comment key={reply.id} comment={reply} postId={post.id} />
        ))}
      </article>
    </>
  );
}
