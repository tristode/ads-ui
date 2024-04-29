import { useState } from "react";
import Editor from "./editor";
import { Button } from "./ui/button";
import { MdSend } from "react-icons/md";
import { createPost } from "@/lib/database";
import { useAuthSession } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NewPost() {
    const [post, setPost] = useState("");
    const [postName, setPostName] = useState("");
    const session = useAuthSession();
    const navigate = useNavigate();
    const submit = async () => {
        setPost("");
        await createPost({
            title: postName,
            content: post,
            author: session?.user?.id || "",
        });
        navigate("/");
    };

    if (!session) {
        return <div>Log in to create a post</div>;
    }

    return (
        <div className="mt-16 flex h-fit max-w-2xl flex-col items-end rounded-md bg-input md:mx-auto">
            <div className="w-full self-start rounded-md bg-gray-900 flex">
                <Avatar className="self-start rounded-md p-2">
                    <AvatarImage
                        src={session.user.user_metadata.avatar_url}
                        alt={session.user.user_metadata.name}
                        className="rounded-full"
                    />
                    <AvatarFallback>
                        {session.user.user_metadata.name[0]}
                    </AvatarFallback>
                </Avatar>
                <input
                    type="text"
                    placeholder="Post name"
                    className="w-full rounded-md bg-gray-900 p-2 text-white outline-none"
                    value={postName}
                    onChange={(e) => setPostName(e.target.value)}
                />
            </div>
            <Editor
                value={post}
                onChange={setPost}
                className="flex-grow self-start w-full"
            />
            <Button variant="none" onClick={submit}>
                <MdSend />
            </Button>
        </div>
    );
}
