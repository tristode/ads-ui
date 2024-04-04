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
            {post && (
              <Post
                post={{
                  ...post,
                  replies: [
                    {
                      id: "3",
                      permalink: "/post/1#comment-1",
                      content: "This is a comment",
                      author: {
                        id: "e4f0627c-dfc3-4b2f-ada0-2b1ea6d69689",
                        handle: "rad1an",
                        name: "rad1an",
                        avatar:
                          "https://avatars.githubusercontent.com/u/63148080?v=4",
                        checkmarks: ["twitter", "discord", "moderator"],
                      },
                      postedAt: new Date(),
                    },
                    {
                      id: "5",
                      permalink: "/post/1#comment-2",
                      content: "This is a comment",
                      author: {
                        id: "6",
                        handle: "janedoe",
                        name: "Jane Doe with bio",
                        avatar: "https://picsum.photos/40/40?random=2",
                        bio: "This is a bio",
                        checkmarks: ["twitter"],
                      },
                      postedAt: new Date(),
                      replies: [
                        {
                          id: "7",
                          permalink: "/post/1#comment-3",
                          content: "This is a reply",
                          author: {
                            id: "8",
                            handle: "johndoe",
                            name: "John Doe",
                            avatar: "https://picsum.photos/40/40?random=3",
                            checkmarks: ["twitter"],
                          },
                          postedAt: new Date(),
                        },
                        {
                          id: "9",
                          permalink: "/post/1#comment-4",
                          content: "This is another reply",
                          author: {
                            id: "10",
                            handle: "johndoe",
                            name: "John Doe",
                            avatar: "https://picsum.photos/40/40?random=3",
                            checkmarks: ["twitter"],
                          },
                          postedAt: new Date(),
                        },
                      ],
                    },
                  ],
                }}
              />
            )}
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
