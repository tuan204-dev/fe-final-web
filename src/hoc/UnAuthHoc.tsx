"use client";
import { COOKIES_REFRESH_TOKEN } from "@/constants/cookies";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const UnAuthHoc = ({ children }: { children: ReactNode }) => {
  //   const refreshToken = getCookie(COOKIES_REFRESH_TOKEN, GET_COOKIE_OPTIONS) as string;

  //   if (refreshToken) {
  //     return redirect("/");
  //   }

  const router = useRouter();
  //   const [localRefreshToken] = useLocalStorage(COOKIES_REFRESH_TOKEN, "");

  const localRefreshToken = window.localStorage.getItem(
    COOKIES_REFRESH_TOKEN
  ) as string;

  useEffect(() => {
    if (localRefreshToken) {
      router.push("/");
    }
  }, [localRefreshToken]);

  return children;
};

export default UnAuthHoc;
