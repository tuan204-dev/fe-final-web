import { OptionsType } from "cookies-next";

export const COOKIES_ACCESS_TOKEN = 'final_web_access_token';
export const COOKIES_REFRESH_TOKEN = 'final_web_refresh_token';

export const COOKIES_OPTIONS: OptionsType = {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "none",
    secure: true,
}