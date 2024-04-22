import { useState } from "react";
import PostCard from "./components/post";
import { useLatestPosts } from "./lib/database";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Homepage() {
  const [postCount, setCount] = useState(1);
  const { posts, hasMore } = useLatestPosts(postCount);

  return (
    <InfiniteScroll
      dataLength={posts?.length || 0}
      next={() => setCount(postCount + 1)}
      hasMore={hasMore}
      loader={<h3>Loading...</h3>}
      className="flex items-center gap-4 flex-col"
      endMessage="No more posts(("
    >
      {posts
        ? posts.map((post) => <PostCard post={post} />)
        : "No posts for now((("}
    </InfiniteScroll>
  );
}
