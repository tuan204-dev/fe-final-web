import { PaginationApiResponse } from "@/types/common";
import axiosInstance from "./axios";
import { IPost } from "@/types/post";
import { IComment } from "@/types/comment";
import { truncateParams } from "@/utils/truncateParams";

interface IGetAllPostParams {
    authorId?: string
    title?: string
    page?: number
    limit?: number
}

const getAllPosts = async (params: IGetAllPostParams = {}) => {
    const { data } = await axiosInstance.get<PaginationApiResponse<IPost[]>>('/post' + truncateParams(params as Record<string, string | null | undefined>))

    return data
}

const likePost = async (postId: string) => {
    await axiosInstance.post(`/post/${postId}/like`)
}

const unLikePost = async (postId: string) => {
    await axiosInstance.delete(`/post/${postId}/like`)
}

const addComment = async (postId: string, content: string) => {
    await axiosInstance.post(`/post/${postId}/comment`, { content });
}

const getCommentOfPost = async (postId: string) => {
    const { data } = await axiosInstance.get<PaginationApiResponse<IComment[]>>(`/post/${postId}/comment`)

    return data;
}

interface AddPostParams {
    title: string
    imageUrl: string
}

const addPost = async (params: AddPostParams) => {
    const { data } = await axiosInstance.post('/post', params)

    return data
}

const deletePost = async (postId: string) => {
    await axiosInstance.delete(`/post/${postId}`)
}

const PostServices = { getAllPosts, likePost, unLikePost, addComment, getCommentOfPost, addPost, deletePost };

export default PostServices;