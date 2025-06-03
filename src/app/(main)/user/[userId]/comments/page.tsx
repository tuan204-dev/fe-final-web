"use client";
import { useUserComments, useUserDetail } from "@/hooks/user";
import { setViewAdvanced } from "@/redux/slices/viewSlice";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const UserComments = () => {
  const router = useRouter();
  const { userId } = useParams<{ userId: string }>();
  const { comment } = useUserComments(userId);
  const { user } = useUserDetail(userId);
  const dispatch = useDispatch();

  const handleClickComment = (pid: string) => {
    dispatch(setViewAdvanced(true));
    router.push(`/user/${userId}?pid=${pid}`);
  };

  return (
    <div className="flex flex-col">
      <p className="text-center font-semibold text-xl py-4">
        Comments of {user.firstName + " " + user.lastName}
      </p>
      <div className="flex flex-col gap-y-3 p-5">
        {comment?.map((comment) => (
          <div
            onClick={() => handleClickComment(comment.post._id)}
            key={comment._id}
            className="grid grid-cols-[50px_1fr] gap-4 items-center bg-gray-50 rounded-md p-3 hover:shadow transition cursor-pointer"
          >
            <Image
              src={comment.post?.imageUrl}
              className="size-[50px] object-cover rounded-md border"
              alt={comment.post?.title || "Post image"}
              width={50}
              height={50}
            />

            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 truncate">
                {comment?.post?.title}
              </span>
              <span className="text-gray-600 text-sm mt-[2px]">
                {comment?.content}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserComments;
