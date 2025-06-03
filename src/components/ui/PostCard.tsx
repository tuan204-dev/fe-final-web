import { usePostOfUser } from "@/hooks/post";
import { useUserComments } from "@/hooks/user";
import { updateSelectedPost } from "@/redux/slices/postSlice";
import { useAppSelector } from "@/redux/store";
import PostServices from "@/services/postServices";
import { IPost } from "@/types/post";
import cn from "@/utils/cn";
import { formatTime } from "@/utils/time";
import useModal from "antd/es/modal/useModal";
import Image from "next/image";
import { FC, KeyboardEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { MdClear } from "react-icons/md";
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
  const { mutate: refreshLoginUserPosts } = usePostOfUser(
      loginUser?._id as string
    );

  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const { mutate: refreshOwnComments } = useUserComments(
    loginUser?._id as string
  );

  const [confirmDelete, contextConfirmDelete] = useModal();

  const authorName = useMemo(
    () => `${post.author?.firstName} ${post.author?.lastName}`.trim(),
    [post.author]
  );

  const [likedUserIdList, setLikedUserIdList] = useState<string[]>([]);

  const isLiked = useMemo(
    () => likedUserIdList?.includes(loginUser?._id as string),
    [loginUser?._id, likedUserIdList]
  );

  useEffect(() => {
    setLikedUserIdList(post.likes || []);
  }, [JSON.stringify(post.likes)]);

  const handleToggleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);

      if (isLiked) {
        const newLikedUserIdList = likedUserIdList.filter(
          (userId) => userId !== loginUser?._id
        );
        setLikedUserIdList(newLikedUserIdList);
        await PostServices.unLikePost(post._id);
      } else {
        const newLikedUserIdList = [
          ...likedUserIdList,
          loginUser?._id as string,
        ];
        setLikedUserIdList(newLikedUserIdList);
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

  const handleDelete = async () => {
    try {
      await PostServices.deletePost(post._id);
      toast.success("Delete post successfully");
      refreshPosts?.();
      refreshLoginUserPosts();
    } catch (e) {
      console.log("Error deleting post:", e);
      toast.error("Failed to delete post. Please try again.");
    }
  };

  const handleClickDelete = () => {
    confirmDelete.confirm({
      title: "Delete Post",
      content:
        "Are you sure you want to delete this post? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: handleDelete,
    });
  };

  return (
    <div
      className={cn(
        "post-animation bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100",
        className
      )}
    >
      {contextConfirmDelete}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={post?.author?.avatar || "/imgs/default-avt.jpg"}
            alt={authorName}
            width={40}
            height={40}
            className="rounded-full object-cover size-10"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{authorName}</p>
            <p className="text-xs text-gray-500">
              {formatTime(post.createdAt)}
            </p>
          </div>
        </div>

        {loginUser?._id === post?.author?._id && (
          <button
            onClick={handleClickDelete}
            className="text-gray-500 hover:text-gray-700 transition text-xl cursor-pointer"
          >
            <MdClear />
          </button>
        )}
      </div>

      <div className="px-4 pb-3">
        <p className="text-gray-800">{post.title}</p>
      </div>

      <div onClick={() => dispatch(updateSelectedPost(post))} className="w-full h-80 cursor-pointer">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={700}
          height={500}
          className="w-full h-full object-cover"
        />
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
            <span className="text-sm">{likedUserIdList?.length ?? 0}</span>
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
