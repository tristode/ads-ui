import { Link } from "react-router-dom";
import Auth from "./auth";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Author from "./author";
import { useSearchUsers } from "@/lib/database";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";

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
                <Button className="text-lg p-4 hover:bg-gray-700 bg-gray-800 rounded-full text-white" size="none"><FaHome /></Button>
            </Link>
            <Link to="/chats">
                <Button className="text-lg p-4 hover:bg-gray-700 bg-gray-800 rounded-full text-white" size="none"><IoChatboxEllipsesOutline /></Button>
            </Link>
            <Link to="/latest">
                <Button className="text-lg p-4 hover:bg-gray-700 bg-gray-800 rounded-full text-white" size="none"><MdOutlinePostAdd /></Button>
            </Link>
            <div className="self-end ml-auto flex items-center gap-2 p-4 h-full">
                <UserSearch />
                <ModeToggle />
                <Auth />
            </div>
        </div>
    );
}
