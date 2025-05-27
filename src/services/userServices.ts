import { ApiResponse, PaginationApiResponse } from "@/types/common";
import axiosInstance from "./axios";
import { IUser } from "@/types/user";

const getAllUser = async () => {
    const { data } = await axiosInstance.get<PaginationApiResponse<IUser[]>>('/user')

    return data;
}

const getUserDetail = async (userId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<IUser>>(`/user/${userId}`)

    return data;
}

const UserServices = { getAllUser, getUserDetail }

export default UserServices;