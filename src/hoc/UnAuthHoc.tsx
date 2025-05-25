"use client";
import { COOKIES_REFRESH_TOKEN } from "@/constants/cookies";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const UnAuthHoc = ({ children }: { children: ReactNode }) => {
  const refreshToken = getCookie(COOKIES_REFRESH_TOKEN) as string;

  if (refreshToken) {
    return redirect("/");
  }

  return children;
};

export default UnAuthHoc;
