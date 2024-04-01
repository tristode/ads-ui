import Post from "@/components/post";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Post
        post={{
          id: "1",
          title: "Hello World",
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
      />
      <ModeToggle />
    </ThemeProvider>
  );
}

export default App;
