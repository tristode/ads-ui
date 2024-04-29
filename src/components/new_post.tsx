import { useState } from "react";
import Editor from "./editor";
import { Button } from "./ui/button";
import { MdSend } from "react-icons/md";

export default function NewPost() {
    const [post, setPost] = useState("");
    return (
        <div className="flex items-end mx-auto mt-16 h-fit max-w-2xl rounded-md bg-input">
            <Editor
                value={post}
                onChange={setPost}
                className="flex-grow"
            />
            <Button variant="none" onClick={() => console.log(post)}>
                <MdSend />
            </Button>
        </div>
    );
}
