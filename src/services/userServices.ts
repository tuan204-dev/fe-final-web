import { ApiResponse, PaginationApiResponse } from "@/types/common";
import { IUser } from "@/types/user";
import axiosInstance, { axiosNoAuth } from "./axios";
import { IComment } from "@/types/comment";

const getAllUser = async () => {
    const { data } = await axiosInstance.get<PaginationApiResponse<IUser[]>>('/user')

    return data;
}

const getUserDetail = async (userId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<IUser>>(`/user/${userId}`)

    return data;
}

export interface RegisterParams {
    token: string
    loginName: string
    password: string
    firstName: string
    lastName: string
    description?: string
    location?: string
    occupation?: string
}

const register = async (params: RegisterParams) => {
    const { data } = await axiosNoAuth.post('/auth/register', params)

    return data;
}

const getAllCommentByUserId = async (userId: string) => {
    if (!userId) {
        return {
            data: {
                data: []
            }
        }
    }

    const { data } = await axiosInstance.get<PaginationApiResponse<IComment[]>>(`/user/${userId}/comment`)

    return data
}

const UserServices = { getAllUser, getUserDetail, register, getAllCommentByUserId }

export default UserServices;