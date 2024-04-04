import { useAuthSession } from "@/lib/auth";
import { sendMessage } from "@/lib/chat";
import { useState } from "react";
import { Button } from "./ui/button";

export default function ChatInput({ chatId }: { chatId: string }) {
  const session = useAuthSession();
  const [message, setMessage] = useState("");

  if (!session) {
    return <div>Log in to send messages</div>;
  }

  return (
    <form
      onSubmit={(e) => {
        sendMessage(session, chatId, message);
        setMessage("");
        e.preventDefault();
      }}
      className="flex gap-2 items-center w-full p-4"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
