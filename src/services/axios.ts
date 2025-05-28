import { COOKIES_ACCESS_TOKEN, COOKIES_REFRESH_TOKEN } from "@/constants/cookies";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import AuthServices from "./authServices";

export const BASE_URL = 'http://localhost:8080';

const getAccessToken = async () => {
    try {
        const accessToken = await getCookie(COOKIES_ACCESS_TOKEN)


        if (!accessToken) {
            return null
        }

        const { exp = 0 } = jwtDecode(accessToken)

        const currentTime = Math.floor(Date.now() / 1000)

        if (exp < currentTime) {
            const refreshToken = await getCookie(COOKIES_REFRESH_TOKEN) as string

            if (!refreshToken) {
                return null
            }

            const { data: newTokens } = await AuthServices.refreshToken(refreshToken)

            setCookie(COOKIES_ACCESS_TOKEN, newTokens.accessToken)
            setCookie(COOKIES_REFRESH_TOKEN, newTokens.refreshToken)

            return newTokens.accessToken
        }

        return accessToken
    } catch (e) {
        console.error("Error getting access token:", e)
        return null
    }
}

const axiosInstance = axios.create({
    baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken()

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    } else {
        delete config.headers.Authorization
    }

    return config
})

export const axiosNoAuth = axios.create({
    baseURL: BASE_URL
})

export default axiosInstance;