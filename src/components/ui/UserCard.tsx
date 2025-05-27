import { IUser } from "@/types/user";
import Link from "next/link";
import { FC } from "react";

interface UserCardProps {
  user: IUser;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const userFullName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <Link
      href={`/user/${user._id}`}
      className="user-item flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition"
    >
      <div className="relative">
        <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold transition duration-300">
          <span>JD</span>
        </div>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{userFullName}</p>
        <p className="text-xs text-gray-500">@{user.loginName}</p>
      </div>
    </Link>
  );
};

export default UserCard;
