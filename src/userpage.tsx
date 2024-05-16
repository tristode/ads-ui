import { useLatestUserPosts, useUser } from "./lib/database";
import {useParams} from "react-router-dom";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Checkmark from "./components/ui/checkmark";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import PostCard from "./components/post";


export default function ProfilePage(){
    const { userId } = useParams();
    const user = useUser(userId ?? "");
    const [postCount,setCount] = useState(5);
    const {posts, hasMore} = useLatestUserPosts(postCount, userId ?? "");
    return(
      <article className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center pt-16">
        <div className="flex flex-col items-start justify-center w-full md:w-5/6 p-10 m-10 bg-white shadow dark:bg-gray-900 mx-7 rounded-2xl">
            <Avatar className="w-128 h-128">
              <AvatarImage alt={user?.name} src={user?.avatar} />
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0 ">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl ">{user?.name}</span>
                <div className="flex flex-row gap-0">
                  {user?.checkmarks?.map((type) => (
                    <Checkmark key={type} type={type} />
                  ))}
                </div>
              </div>
              <span className="font-black text-xs text-gray-500">
                @{user?.handle}  
              </span>
              <span className="font-black text-xs text-gray-500">
                {user?.bio}
              </span>
              <span>
              <InfiniteScroll
                dataLength={posts?.length || 0}
                next={() => setCount(postCount + 5)}
                hasMore={hasMore}
                loader={<h3>Loading...</h3>}
                className="flex flex-col items-center gap-4"
                endMessage="No more posts(("
            >
                {posts
                    ? posts.map((post) => <PostCard post={post} />)
                    : "No posts for now((("}
            </InfiniteScroll>
            </span>
        </div>
        </div>
    </div>
    </article>
    )
}