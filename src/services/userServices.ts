import { ApiResponse, PaginationApiResponse } from "@/types/common";
import axiosInstance, { BASE_URL } from "./axios";
import { IUser } from "@/types/user";
import axios from "axios";

const getAllUser = async () => {
    const { data } = await axiosInstance.get<PaginationApiResponse<IUser[]>>('/user')

    return data;
}

const getUserDetail = async (userId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<IUser>>(`/user/${userId}`)

    return data;
}

export interface RegisterParams {
    loginName: string
    password: string
    firstName: string
    lastName: string
    description?: string
    location?: string
    occupation?: string
}

const register = async (params: RegisterParams) => {
    const { data } = await axios.post(BASE_URL + '/user/register', params)

    return data;
}

const UserServices = { getAllUser, getUserDetail, register }

export default UserServices;