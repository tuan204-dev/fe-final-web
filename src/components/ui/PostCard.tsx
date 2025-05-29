import { useUserComments } from "@/hooks/user";
import { updateSelectedPost } from "@/redux/slices/postSlice";
import { useAppSelector } from "@/redux/store";
import PostServices from "@/services/postServices";
import { IPost } from "@/types/post";
import cn from "@/utils/cn";
import { formatTime } from "@/utils/time";
import { FC, KeyboardEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface PostCardProps {
  post: IPost;
  refreshPosts?: () => void;
  className?: string;
}

const PostCard: FC<PostCardProps> = ({ post, refreshPosts, className }) => {
  const dispatch = useDispatch();
  const loginUser = useAppSelector((state) => state.auth.user);
  const [isLiking, setIsLiking] = useState(false);

  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const { mutate: refreshOwnComments } = useUserComments(
    loginUser?._id as string
  );

  const authorName = useMemo(
    () => `${post.author?.firstName} ${post.author?.lastName}`.trim(),
    [post.author]
  );

  const isLiked = useMemo(
    () => post.likes?.includes(loginUser?._id as string),
    [loginUser?._id, post.likes]
  );

  const handleToggleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);

      if (isLiked) {
        await PostServices.unLikePost(post._id);
      } else {
        await PostServices.likePost(post._id);
      }
      refreshPosts?.();
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async () => {
    try {
      if (!comment.trim()) {
        toast.error("Comment cannot be empty");
        return;
      }

      setIsCommenting(true);
      await PostServices.addComment(post._id, comment);
      setComment("");
      refreshPosts?.();
      refreshOwnComments();
      toast.success("Comment added successfully");
    } catch (e) {
      console.log("Error adding comment:", e);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  return (
    <div
      className={cn(
        "post-animation bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100",
        className
      )}
    >
      <div className="p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
          JD
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{authorName}</p>
          <p className="text-xs text-gray-500">{formatTime(post.createdAt)}</p>
        </div>
      </div>

      <div className="px-4 pb-3">
        <p className="text-gray-800">{post.title}</p>
      </div>

      <div className="w-full h-80">
        <div
          className="h-full w-full bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${post.imageUrl})`,
          }}
        ></div>
      </div>

      <div className="p-4 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggleLike}
            className="like-button flex items-center space-x-1 cursor-pointer outline-none"
          >
            {isLiked ? (
              <FaHeart className="text-red-500 transition" />
            ) : (
              <FaRegHeart className="text-gray-500 hover:text-red-500 transition" />
            )}
            <span className="text-sm">{post.likes?.length ?? 0}</span>
          </button>

          <button
            onClick={() => dispatch(updateSelectedPost(post))}
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 cursor-pointer"
          >
            <FaRegComment />
            <span className="text-sm">{post.commentCount ?? 0}</span>
          </button>
        </div>

        {/* <button className="text-sm text-gray-500 hover:text-gray-700">
          <FaRegBookmark />
        </button> */}
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            disabled={!comment || isCommenting}
            onClick={handleComment}
            className="ml-2 text-sm font-medium text-blue-500 hover:text-blue-700 disabled:cursor-not-allowed cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
