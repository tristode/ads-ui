import { Comment } from "@/types";
import { useState } from "react";
import AddComment from "./add-comment";
import Author from "./author";
import Timedelta from "./ui/timedelta";

export default function CommentCard({ comment }: { comment: Comment }) {
  const [replying, setReplying] = useState(false);

  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <Author user={comment.author}>
        <Timedelta dateTime={comment.postedAt} />
      </Author>
      <div className="pl-8 mt-3">{comment.content}</div>
      <div className="flex items-center mt-3 pl-8 space-x-2">
        <button
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          onClick={() => setReplying(!replying)}
        >
          Reply
        </button>
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
          Like
        </button>
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
          Share
        </button>
      </div>
      {replying && <AddComment parentId={comment.id} />}
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
