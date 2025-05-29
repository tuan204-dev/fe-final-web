import UserServices from "@/services/userServices"
import { IUser } from "@/types/user"
import useSWR from "swr"

export const useUsers = () => {
    const { data, error, isLoading, isValidating, mutate } = useSWR('/user', UserServices.getAllUser)

    return {
        users: data?.data?.data || [],
        isLoading,
        isValidating,
        error,
        mutate
    }
}

export const useUserDetail = (userId: string) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/user/${userId}`, () => UserServices.getUserDetail(userId))

    return {
        user: data?.data ?? {} as IUser,
        error, isLoading, isValidating, mutate
    }
}

export const useUserComments = (userId: string) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/user/${userId}/comment`, () => UserServices.getAllCommentByUserId(userId))

    return {
        comment: data?.data.data ?? [],
        isLoading,
        error,
        isValidating,
        mutate,
    }
}

