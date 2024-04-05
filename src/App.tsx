import Post from "@/components/post";
import { ThemeProvider } from "@/components/theme-provider";
import Auth from "./components/auth";
import Chats from "./components/chats";
import Invite from "./components/invite";
import { ModeToggle } from "./components/mode-toggle";
import { ReplyingProvider } from "./components/single-reply-box-provider";
import { ChatsProvider } from "./lib/chat";
import { DataProvider, usePostPreview } from "./lib/database";

function App() {
  const post = usePostPreview("0dbcdd10-b4f6-4223-9386-2992103da603");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReplyingProvider>
        <DataProvider>
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
            {post && <Post post={post} />}
            <ModeToggle />
            <div className="h-screen">
              <Chats />
            </div>
          </ChatsProvider>
        </DataProvider>
      </ReplyingProvider>
    </ThemeProvider>
  );
}

export default App;
