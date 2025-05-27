import { useComments, usePosts } from "@/hooks/post";
import { useAppSelector } from "@/redux/store";
import PostServices from "@/services/postServices";
import { IPost } from "@/types/post";
import { formatTime } from "@/utils/time";
import { Modal, Spin } from "antd";
import { FC, KeyboardEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";

interface PostDetailModalProps {
  post: IPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const PostDetailModal: FC<PostDetailModalProps> = ({
  isOpen,
  onClose,
  post,
}) => {
  const {
    comments,
    mutate: refreshComments,
    isLoading: isCommentLoading,
  } = useComments(post?._id ?? "");
  const loginUser = useAppSelector((state) => state.auth.user);
  const { mutate: refreshAllPosts } = usePosts();
  const [isLiking, setIsLiking] = useState(false);

  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const isLiked = useMemo(
    () => post?.likes?.includes(loginUser?._id as string),
    [loginUser?._id, post?.likes]
  );

  const handleToggleLike = async () => {
    if (isLiking || !post) return;

    try {
      setIsLiking(true);

      if (isLiked) {
        await PostServices.unLikePost(post._id);
      } else {
        await PostServices.likePost(post._id);
      }
      refreshAllPosts();
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async () => {
    try {
      if (!comment.trim() || !post) {
        toast.error("Comment cannot be empty");
        return;
      }

      setIsCommenting(true);
      await PostServices.addComment(post._id, comment);
      setComment("");
      refreshAllPosts();
      refreshComments();
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

  if (!post) return null;

  const authorName =
    `${post.author?.firstName} ${post.author?.lastName}`.trim();

  return (
    <Modal
      title={
        <div className="w-full text-center">{`${post?.author?.firstName}'s Post`}</div>
      }
      open={isOpen}
      classNames={{
        body: "max-h-[75vh] overflow-y-auto",
        content: "max-w-2xl mx-auto",
      }}
      onCancel={onClose}
      footer={
        <div className="">
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
      }
    >
      <div className="p-4 px-0 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
          JD
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{authorName}</p>
          <p className="text-xs text-gray-500">{formatTime(post?.createdAt)}</p>
        </div>
      </div>

      <div className="px-0 pb-3">
        <p className="text-gray-800">{post?.title}</p>
      </div>

      <div className="w-full h-80">
        <div
          className="h-full w-full bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${post?.imageUrl})`,
          }}
        ></div>
      </div>

      <div className="pt-4 px-2 flex items-center justify-between border-t border-gray-200 pb-3 border-b">
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

          <button className="flex items-center space-x-1 text-gray-500 ">
            <FaRegComment />
            <span className="text-sm">{comments?.length ?? 0}</span>
          </button>
        </div>

        {/* <button className="text-sm text-gray-500 hover:text-gray-700">
          <FaRegBookmark />
        </button> */}
      </div>

      {isCommentLoading ? (
        <div className="flex items-center justify-center p-5 w-full">
          <Spin />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 py-3">
          {comments?.map((comment) => (
            <div
              key={comment._id}
              className="grid grid-cols-[32px_1fr] gap-x-3 w-fit"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                JD
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col gap-y-1 p-2 pt-1 rounded-2xl bg-gray-200">
                  <span className="text-sm text-gray-800 font-medium">{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</span>

                  <p className="text-sm text-gray-700">{comment?.content}</p>
                </div>

                <span className="text-[11px] text-gray-600 pl-2">
                  {formatTime(comment.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default PostDetailModal;
