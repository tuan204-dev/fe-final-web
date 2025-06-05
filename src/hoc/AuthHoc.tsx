"use client";
import { COOKIES_REFRESH_TOKEN, GET_COOKIE_OPTIONS } from "@/constants/cookies";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AuthHoc = ({ children }: { children: ReactNode }) => {
  const refreshToken = getCookie(
    COOKIES_REFRESH_TOKEN,
    GET_COOKIE_OPTIONS
  ) as string;
  const router = useRouter();
  //   const [localRefreshToken] = useLocalStorage(COOKIES_REFRESH_TOKEN, "");
  const localRefreshToken = localStorage.getItem(
    COOKIES_REFRESH_TOKEN
  ) as string;

  //   if (!refreshToken) {
  //     return redirect("/auth/login");
  //   }

  useEffect(() => {
    if (!localRefreshToken) {
      router.push("/auth/login");
    }
  }, [localRefreshToken]);

  return children;
};

export default AuthHoc;
