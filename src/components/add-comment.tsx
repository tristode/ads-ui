import { useState } from "react";
import { MdSend } from "react-icons/md";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export interface AddCommentArgs {
  postId: string;
  content: string;
}

export default function AddComment({
  postId,
  addComment,
}: {
  postId: string;
  addComment: (comment: AddCommentArgs) => void;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment({ postId, content });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="rounded-lg overflow-hidden flex flex-row items-stretch">
        <Textarea
          autoResize
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="w-full bg-gray-200 dark:bg-gray-600 rounded-none border-none min-h-4"
        />
        <button
          type="submit"
          className="p-2 rounded-none bg-gray-200 dark:bg-gray-600"
        >
          <MdSend />
        </button>
      </div>
    </form>
  );
}
