import { OptionsType } from "cookies-next";

export const COOKIES_ACCESS_TOKEN = 'final_web_access_token';
export const COOKIES_REFRESH_TOKEN = 'final_web_refresh_token';

export const COOKIES_OPTIONS: OptionsType = {
    domain: '.codesandbox.io',
    secure: true,
    path: '/',
}

export const GET_COOKIE_OPTIONS: OptionsType = {
    domain: '.codesandbox.io',
    secure: true,
    path: '/',
}