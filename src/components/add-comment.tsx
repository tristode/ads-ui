import useAuthSession from "@/lib/auth";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";

export interface AddCommentArgs {
  postId: string;
  content: string;
}

export default function AddComment({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const session = useAuthSession();

  const addComment = async ({ postId, content }: AddCommentArgs) => {
    console.log(`Adding comment to post ${postId}: ${content}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment({ postId, content });
    setContent("");
  };

  return (
    session && (
      <form onSubmit={handleSubmit} className="p-4">
        <div className="rounded-lg overflow-hidden flex flex-row items-stretch bg-gray-200 dark:bg-gray-600">
          <span className="p-2">
            <Avatar className="w-6 h-6">
              <AvatarImage
                alt={session.user.user_metadata.name}
                src={session.user.user_metadata.avatar_url}
              />
              <AvatarFallback>
                {session.user.user_metadata.name[0]}
              </AvatarFallback>
            </Avatar>
          </span>
          <Textarea
            autoResize
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-gray-200 dark:bg-gray-600 rounded-none border-none min-h-4 resize-none"
          />
          <button
            type="submit"
            className="p-2 rounded-none bg-gray-200 dark:bg-gray-600"
          >
            <MdSend />
          </button>
        </div>
      </form>
    )
  );
}
