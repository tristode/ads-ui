import { signIn, useAuthSession } from "@/lib/auth";
import { Comment } from "@/types";
import { useState } from "react";
import { FaHeart, FaReply } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import AddComment from "./add-comment";
import Author from "./author";
import Timedelta from "./ui/timedelta";

export default function CommentCard({ comment }: { comment: Comment }) {
  const session = useAuthSession();
  const [replying, setReplying] = useState(false);
  const liked = comment.reactedByLoggedInUser?.includes("like");

  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <Author user={comment.author}>
        <Timedelta dateTime={comment.postedAt} />
      </Author>
      <div className="pl-8 mt-3">{comment.content}</div>
      <div className="flex items-center mt-3 pl-8 space-x-4 font-black">
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1">
          <FaHeart className={liked ? "text-red-500" : "text-gray-500"} />
          Like
        </button>
        <button
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1"
          onClick={() =>
            session
              ? setReplying(!replying)
              : signIn(
                  new URL(comment.permalink, window.location.origin).toString()
                )
          }
        >
          <FaReply className="text-gray-500" />
          Reply
        </button>
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1">
          <MdShare className="text-gray-500" />
          Share
        </button>
      </div>
      {replying && (
        <AddComment
          parentId={comment.id}
          parentAuthorHandle={comment.author.handle}
          onCancel={() => setReplying(false)}
        />
      )}
      {comment.replies && (
        <div className="pl-2 mt-3 border-l-2 border-gray-200 dark:border-gray-700">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
