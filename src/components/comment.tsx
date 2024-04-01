import User from "@/components/user";
import { Comment } from "@/types";

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="p-4">
      <User user={comment.author} />
      <div className="pl-4 mt-3">{comment.content}</div>
    </div>
  );
}
