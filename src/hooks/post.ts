import PostServices from "@/services/postServices"
import useSWR from "swr"

export const usePosts = () => {
    const { data, error, isLoading, isValidating, mutate } = useSWR('/post', PostServices.getAllPosts)

    return {
        posts: data?.data?.data || [],
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export const useComments = (postId: string) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(
        postId ? `/post/${postId}/comment` : null,
        () => PostServices.getCommentOfPost(postId)
    );

    return {
        comments: data?.data?.data || [],
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export const usePostOfUser = (userId: string) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/post?userId=${userId}`, () => PostServices.getAllPosts({ authorId: userId }))

    return {
        posts: data?.data?.data || [],
        error,
        isLoading,
        isValidating,
        mutate
    }
}