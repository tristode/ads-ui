import Post from "@/components/post";
import { ThemeProvider } from "@/components/theme-provider";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Chats from "./components/chats";
import { ReplyingProvider } from "./components/single-reply-box-provider";
import { ChatsProvider } from "./lib/chat";
import { DataProvider, usePostPreview } from "./lib/database";
import Navigation from "./components/navigation";
import Homepage from "./homepage";
import NewPost from "./components/new_post";
import Feed from "./feed";
import CreateProfile from "./create-profile";

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
        path: "/feed",
        element: <Feed />,
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
        children: [
          {
            path: ":chatId",
            element: (
              <div className="h-screen">
                <Chats />
              </div>
            ),
          },
        ],
      },
      {
        path: "new-post",
        element: <NewPost />,
      },
      {
        path: "/create-profile",
        element: <CreateProfile />,
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
