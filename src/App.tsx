import Post from "@/components/post";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    useParams,
} from "react-router-dom";
import Author from "./components/author";
import Chats from "./components/chats";
import Invite from "./components/invite";
import { ReplyingProvider } from "./components/single-reply-box-provider";
import { ChatsProvider } from "./lib/chat";
import { DataProvider, usePostPreview, useSearchUsers } from "./lib/database";
import Navigation from "./components/navigation";
import Homepage from "./homepage";

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

function PostPage() {
    const { id } = useParams();
    const post = usePostPreview(id || "");

    return post && <Post post={post} />;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <div className="pb-16 md:pb-0 md:pt-16">
                    <Outlet />
                </div>
                <Navigation />
            </>
        ),
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: "post/:id",
                element: <PostPage />,
            },
            {
                path: "chats",
                element: (
                    <div className="h-screen">
                        <Chats />
                    </div>
                ),
            },
        ],
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
