import { ApiResponse } from "@/types/common";
import axiosInstance, { BASE_URL } from "./axios";
import { IUser } from "@/types/user";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { COOKIES_REFRESH_TOKEN } from "@/constants/cookies";

interface IRefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

const refreshToken = async (refreshToken: string) => {
    const { data } = await axiosInstance.post<ApiResponse<IRefreshTokenResponse>>(`/auth/refresh`, { refreshToken })

    return data;
}

const getUserInfo = async () => {
    const { data } = await axiosInstance.get<ApiResponse<IUser>>('/auth/info')

    return data
}

interface ILoginReq {
    loginName: string;
    password: string;
}

interface ILoginRes {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

const login = async (params: ILoginReq) => {
    const { data } = await axios.post<ApiResponse<ILoginRes>>(BASE_URL + '/auth/login', { ...params })

    return data;
}

const logout = async () => {
    const refreshToken = await getCookie(COOKIES_REFRESH_TOKEN)

    await axios.post(BASE_URL + '/auth/logout', {
        refreshToken
    })

    deleteCookie(COOKIES_REFRESH_TOKEN);
    deleteCookie(COOKIES_REFRESH_TOKEN);
}

const AuthServices = { refreshToken, getUserInfo, login, logout }

export default AuthServices;