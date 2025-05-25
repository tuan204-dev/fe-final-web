import { COOKIES_REFRESH_TOKEN } from "@/constants/cookies";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthHoc = ({ children }: { children: ReactNode }) => {
  const refreshToken = getCookie(COOKIES_REFRESH_TOKEN) as string;

  if (!refreshToken) {
    return redirect("/auth/login");
  }

  return children;
};

export default AuthHoc;
