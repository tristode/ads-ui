import Post from "@/components/post";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import Auth from "./components/auth";
import Author from "./components/author";
import Chats from "./components/chats";
import Invite from "./components/invite";
import { ModeToggle } from "./components/mode-toggle";
import { ReplyingProvider } from "./components/single-reply-box-provider";
import { ChatsProvider } from "./lib/chat";
import { DataProvider, usePostPreview, useSearchUsers } from "./lib/database";

function PostPreview() {
  const post = usePostPreview("0dbcdd10-b4f6-4223-9386-2992103da603");

  return post && <Post post={post} />;
}

function UserSearch() {
  const [query, setQuery] = useState("");
  const users = useSearchUsers(query);

  return (
    <div className="p-4 flex flex-col gap-4">
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

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DataProvider>
        <ReplyingProvider>
          <ChatsProvider>
            <Auth />
            <Invite
              link="https://discord.gg/mnwByZAS"
              title="УКУ: Прикладні науки"
              icon="/logo.png"
              notice="Цей сайт - для балів з вебу, насправді ми вас в діскорді чекаємо!"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-full text-nowrap text-ellipsis overflow-hidden">
                ФПН має діскорд-сервер :3
              </p>
            </Invite>
            <UserSearch />
            <PostPreview />
            <ModeToggle />
            <div className="h-screen">
              <Chats />
            </div>
          </ChatsProvider>
        </ReplyingProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
