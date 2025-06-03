import { usePostOfUser } from "@/hooks/post";
import { useUserComments } from "@/hooks/user";
import { IUser } from "@/types/user";
import { Image } from "antd";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface UserCardProps {
  user: IUser;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const router = useRouter();
  const userFullName = `${user.firstName} ${user.lastName}`.trim();

  const { comment } = useUserComments(user._id);
  const { posts } = usePostOfUser(user._id);

  const handleClickComments = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/user/${user._id}/comments`);
  };

  const handleClickUser = () => {
    router.push(`/user/${user._id}`);
  };

  return (
    <div
      onClick={handleClickUser}
      className="user-item flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition bg-gray-50"
    >
      <div className="relative">
        <Image
          src={user?.avatar ?? "/imgs/default-avt.jpg"}
          fallback="/imgs/default-avt.jpg"
          alt={`${user?.firstName} ${user?.lastName}`}
          className="rounded-full !size-10 object-cover"
          preview={false}
        />
        {/* <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span> */}
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium text-gray-900">{userFullName}</p>
        <p className="text-xs text-gray-500">@{user.loginName}</p>
      </div>
      <div className="flex items-center gap-x-1">
        <span className="size-4 rounded-full bg-green-700 text-white text-xs flex items-center justify-center">
          {posts?.length ?? 0}
        </span>
        <button
          onClick={handleClickComments}
          className="size-4 rounded-full bg-red-700 text-white text-xs flex items-center justify-center cursor-pointer"
        >
          {comment?.length ?? 0}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
