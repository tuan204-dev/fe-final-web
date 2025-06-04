import { COOKIES_REFRESH_TOKEN, GET_COOKIE_OPTIONS } from "@/constants/cookies";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthHoc = ({ children }: { children: ReactNode }) => {
  const refreshToken = getCookie(COOKIES_REFRESH_TOKEN, GET_COOKIE_OPTIONS) as string;

  if (!refreshToken) {
    return redirect("/auth/login");
  }

  return children;
};

export default AuthHoc;
