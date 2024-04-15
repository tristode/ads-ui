import { Link } from "react-router-dom";
import Auth from "./auth";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

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
        </div>
    );
}
