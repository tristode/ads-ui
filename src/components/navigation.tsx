import { Link } from "react-router-dom";
import Auth from "./auth";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Author from "./author";
import { useSearchUsers } from "@/lib/database";
import { useState } from "react";

function UserSearch() {
    const [query, setQuery] = useState("");
    const users = useSearchUsers(query);

    let atLeastOne = false;
    const authors = users.map((user) => {
        atLeastOne = true;
        return <Author key={user.id} user={user} />;
    });

    return (
        <div className="relative flex flex-col items-center justify-center">
            <input
                className="rounded-md bg-gray-50 dark:bg-gray-700 p-1"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {atLeastOne && (
                <div className="absolute left-0 right-0 top-full mt-2 rounded-md bg-zinc-100 dark:bg-gray-700 p-2">
                    {authors}
                </div>
            )}
        </div>
    );
}

export default function Navigation() {
    return (
        <div className="fixed bottom-0 z-10 flex h-16 w-full items-center gap-2 bg-gray-900 p-4 md:bottom-auto md:top-0">
            <Link to="/">
                <Button>HOME</Button>
            </Link>
            <Link to="/chats">
                <Button>Chats</Button>
            </Link>
            <Link to="/post/0dbcdd10-b4f6-4223-9386-2992103da603">
                <Button>Post</Button>
            </Link>
            <Auth />
            <ModeToggle />
            <UserSearch />
        </div>
    );
}
