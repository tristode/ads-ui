import { useAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { AddCommentArgs } from "@/types";
import { useState } from "react";
import { MdClose, MdSend } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";

export default function AddComment({
  parentId,
  parentAuthorHandle,
  onCancel,
  className,
}: {
  parentId: string;
  parentAuthorHandle?: string;
  onCancel?: () => void;
  className?: string;
}) {
  const [content, setContent] = useState("");
  const session = useAuthSession();

  const addComment = async ({ parentId, content }: AddCommentArgs) => {
    console.log(`Adding comment to post ${parentId}: ${content}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment({ parentId, content });
    setContent("");
  };

  return (
    session && (
      <form
        onSubmit={handleSubmit}
        className={cn(
          "rounded-t-lg sm:rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-600 sm:bg-transparent fixed sm:static bottom-0 left-0 right-0 z-10",
          className
        )}
      >
        {parentAuthorHandle && (
          <div className="text-sm text-gray-500 dark:text-gray-400 p-2 sm:hidden flex items-center justify-between">
            <span>Replying to @{parentAuthorHandle}</span>
            {onCancel && (
              <MdClose className="cursor-pointer" onClick={onCancel} />
            )}
          </div>
        )}
        <div className="rounded-lg overflow-hidden flex flex-row items-stretch bg-gray-300 sm:bg-gray-200 dark:bg-gray-600">
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
            className="w-full bg-gray-300 sm:bg-gray-200 dark:bg-gray-600 rounded-none border-none min-h-6 sm:min-h-4 resize-none"
          />
          <button
            type="submit"
            className="p-2 rounded-none bg-gray-300 sm:bg-gray-200 dark:bg-gray-600"
          >
            <MdSend />
          </button>
        </div>
      </form>
    )
  );
}
