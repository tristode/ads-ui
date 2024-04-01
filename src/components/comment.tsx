import { Comment } from "@/types";
import Author from "./author";
import Timedelta from "./ui/timedelta";

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <Author user={comment.author}>
        <Timedelta dateTime={comment.postedAt} />
      </Author>
      <div className="pl-8 mt-3">{comment.content}</div>
    </div>
  );
}
