import Post from "@/components/post";
import { ThemeProvider } from "@/components/theme-provider";
import Auth from "./components/auth";
import Invite from "./components/invite";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Auth />
      <Invite
        link="https://discord.gg/mnwByZAS"
        title="УКУ: Прикладні науки"
        icon="https://cdn.discordapp.com/icons/1015001493780320327/25afdfbde6ce874799f812cc9d042889.webp?size=56"
        preamble="А ви знали, що ФПН має діскорд-сервер?"
        notice="Цей сайт - для балів з вебу, насправді ми вас в діскорді чекаємо!"
      />
      <Post
        post={{
          id: "1",
          title: "Hello World",
          badges: ["badge1", "badge2"],
          content: "This is a post content",
          images: [
            "https://picsum.photos/800/600?random=1",
            "https://picsum.photos/800/600?random=2",
            "https://picsum.photos/800/600?random=3",
            "https://picsum.photos/800/600?random=4",
            "https://picsum.photos/800/600?random=5",
            "https://picsum.photos/800/600?random=6",
            "https://picsum.photos/800/600?random=7",
            "https://picsum.photos/800/600?random=8",
          ],
          author: {
            id: "1",
            name: "John Doe",
            avatar: "https://picsum.photos/40/40?random=1",
            bio: "This is a bio",
          },
          postedAt: new Date(),
          comments: [
            {
              id: "1",
              content: "This is a comment",
              author: {
                id: "2",
                name: "Jane Doe",
                avatar: "https://picsum.photos/40/40?random=2",
              },
              postedAt: new Date(),
            },
            {
              id: "2",
              content: "This is a comment",
              author: {
                id: "2",
                name: "Jane Doe with bio",
                avatar: "https://picsum.photos/40/40?random=2",
                bio: "This is a bio",
              },
              postedAt: new Date(),
            },
          ],
        }}
        addComment={(comment) => {
          console.log(comment);
        }}
      />
      <ModeToggle />
    </ThemeProvider>
  );
}

export default App;
