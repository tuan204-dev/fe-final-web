"use client";

import Loading from "@/components/ui/Loading";
import PostCard from "@/components/ui/PostCard";
import { usePosts } from "@/hooks/post";
import { useAppSelector } from "@/redux/store";
import { Carousel } from "antd";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const HomePage = () => {
  const { posts, mutate: refreshPosts, isLoading } = usePosts();
  const isAdvancedView = useAppSelector((state) => state.view.isAdvancedView);

  if (isLoading) {
    return <Loading />;
  }

  if (isAdvancedView) {
    return (
      <div className="w-full max-w-[752px] mx-auto py-7 px-10">
        <Carousel
          arrows={true}
          draggable={true}
          prevArrow={<FaCaretLeft />}
          nextArrow={<FaCaretRight />}
          infinite
        >
          {posts?.map((post) => (
            <div key={post._id}>
              <PostCard
                key={post._id}
                post={post}
                refreshPosts={refreshPosts}
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto max-w-2xl gap-y-6 py-6">
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} refreshPosts={refreshPosts} />
      ))}
    </div>
  );
};

export default HomePage;
