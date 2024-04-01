import User from "@/components/ui/user";
import { Comment } from "@/types";

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="p-4 bg-white hover:bg-gray-50">
      <User user={comment.author} />
      <div className="mt-3 space-y-2">{comment.content}</div>
    </div>
  );
}
