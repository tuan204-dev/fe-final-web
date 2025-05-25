"use client";
import {
  COOKIES_ACCESS_TOKEN,
  COOKIES_REFRESH_TOKEN,
} from "@/constants/cookies";
import { updateUser } from "@/redux/slices/authSlice";
import AuthServices from "@/services/authServices";
import { Spin } from "antd";
import { getCookie, setCookie } from "cookies-next";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const refreshToken = getCookie(COOKIES_REFRESH_TOKEN) as string;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        if (!refreshToken) {
          return;
        }

        const { data: newTokens, success } = await AuthServices.refreshToken(
          refreshToken
        );

        if (!success) {
          return;
        }

        setCookie(COOKIES_ACCESS_TOKEN, newTokens.accessToken);
        setCookie(COOKIES_REFRESH_TOKEN, newTokens.refreshToken);

        const { data: userInfo } = await AuthServices.getUserInfo();

        dispatch(updateUser(userInfo));
      } catch (e) {
        console.error("Error during authentication:", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="grid place-items-center h-screen">
        <Spin />
      </div>
    );
  }

  return children;
};

export default AuthProvider;
