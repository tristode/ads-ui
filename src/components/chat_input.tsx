import { useAuthSession } from "@/lib/auth";
import { sendMessage } from "@/lib/chat";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import Editor from "./editor";

export default function ChatInput({ chatId }: { chatId: string }) {
    const session = useAuthSession();
    const [message, setMessage] = useState("");

    const onChange = useCallback((val: string) => {
        setMessage(val);
    }, []);

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
            className="flex w-full items-center gap-2 p-4"
        >
            <Editor value={message} onChange={onChange} />
            <Button type="submit">Send</Button>
        </form>
    );
}
