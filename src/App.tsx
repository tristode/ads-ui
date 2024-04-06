import Post from "@/components/post";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import {
    createBrowserRouter,
    Link,
    RouterProvider,
    useParams,
} from "react-router-dom";
import Auth from "./components/auth";
import Author from "./components/author";
import Chats from "./components/chats";
import Invite from "./components/invite";
import { ModeToggle } from "./components/mode-toggle";
import { ReplyingProvider } from "./components/single-reply-box-provider";
import { Button } from "./components/ui/button";
import { ChatsProvider } from "./lib/chat";
import { DataProvider, usePostPreview, useSearchUsers } from "./lib/database";

function UserSearch() {
    const [query, setQuery] = useState("");
    const users = useSearchUsers(query);

    return (
        <div className="flex flex-col gap-4 p-4">
            <input
                className="bg-gray-100 dark:bg-gray-800"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {users.map((user) => (
                <Author key={user.id} user={user} />
            ))}
        </div>
    );
}

function Homepage() {
    return (
        <>
            <div className="flexitem-center flex gap-2 p-4">
                <Auth />
                <ModeToggle />
            </div>
            <UserSearch />
            <Invite
                link="https://discord.gg/mnwByZAS"
                title="УКУ: Прикладні науки"
                icon="/logo.png"
                notice="Цей сайт - для балів з вебу, насправді ми вас в діскорді чекаємо!"
            >
                <p className="max-w-full overflow-hidden text-ellipsis text-nowrap text-sm text-gray-600 dark:text-gray-400">
                    ФПН має діскорд-сервер :3
                </p>
            </Invite>
            <div className="flex w-full justify-center gap-4 p-4">
                <Link to="/chats">
                    <Button>Chats</Button>
                </Link>
                <Link to="/post/0dbcdd10-b4f6-4223-9386-2992103da603">
                    <Button>Post</Button>
                </Link>
            </div>
        </>
    );
}

function PostPage() {
    const { id } = useParams();
    const post = usePostPreview(id || "");

    return post && <Post post={post} />;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "/post/:id",
        element: <PostPage />,
    },
    {
        path: "/chats",
        element: (
            <div className="h-screen">
                <Chats />
            </div>
        ),
    },
]);

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <DataProvider>
                <ReplyingProvider>
                    <ChatsProvider>
                        <RouterProvider router={router} />
                    </ChatsProvider>
                </ReplyingProvider>
            </DataProvider>
        </ThemeProvider>
    );
}

export default App;
