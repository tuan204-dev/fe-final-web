"use client";
import Loading from "@/components/ui/Loading";
import PostCard from "@/components/ui/PostCard";
import { usePostOfUser } from "@/hooks/post";
import { useAppSelector } from "@/redux/store";
import UserServices from "@/services/userServices";
import { IUser } from "@/types/user";
import { Carousel } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdWork } from "react-icons/md";

const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const searchParams = useSearchParams();
  const pid = searchParams.get("pid");
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<IUser | null>(null);
  const {
    posts,
    mutate: refreshPosts,
    isLoading: isPostLoading,
  } = usePostOfUser(userId as string);

  const isAdvancedView = useAppSelector((state) => state.view.isAdvancedView);

  const initialSlide = posts.findIndex((post) => post._id === pid);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const userRes = await UserServices.getUserDetail(userId);
        setUser(userRes.data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  if (isLoading || isPostLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <div className="flex flex-col items-center py-7">
        <div className="size-20 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
          JD
        </div>

        <span className="text-xs text-gray-600 mt-2">@{user?.loginName}</span>
        <h1 className="text-lg font-medium text-gray-900 my-3">{`${user?.firstName} ${user?.lastName}`}</h1>

        {user?.description && <span className="mb-3">{user?.description}</span>}

        <div className="grid grid-cols-2 gap-x-5 text-sm text-gray-800">
          {user?.location && (
            <div className="flex items-center gap-x-2">
              <IoLocationOutline /> <span>{user?.location}</span>
            </div>
          )}
          {user?.occupation && (
            <div className="flex items-center gap-x-2">
              <MdWork /> <span>{user?.occupation}</span>
            </div>
          )}
        </div>
      </div>

      {!posts.length && (
        <div className="flex flex-col items-center justify-center py-40">
          <h1 className="text-2xl font-semibold text-gray-800">
            No Posts Found
          </h1>
          <p className="text-gray-600 mt-2">
            This user has not posted anything yet.
          </p>
        </div>
      )}

      {!isAdvancedView ? (
        <div className="flex flex-col gap-y-6 max-w-2xl mx-auto mb-6">
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} refreshPosts={refreshPosts} />
          ))}
        </div>
      ) : (
        <div className="w-screen max-w-2xl mx-auto">
          <Carousel
            arrows={true}
            draggable={true}
            prevArrow={<FaCaretLeft size={80} />}
            nextArrow={<FaCaretRight size={80} />}
            infinite
            initialSlide={initialSlide}
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
      )}
    </div>
  );
};

export default UserPage;
