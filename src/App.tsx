import Post from "@/components/ui/post";

function App() {
  return (
    <Post
      post={{
        id: "1",
        title: "Hello World",
        content: "This is a post content",
        author: {
          id: "1",
          name: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40",
        },
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
        comments: [
          {
            id: "1",
            content: "This is a comment",
            author: {
              id: "2",
              name: "Jane Doe",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          },
        ],
      }}
    />
  );
}

export default App;
