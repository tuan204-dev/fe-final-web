import UnAuthHoc from "@/hoc/UnAuthHoc";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <UnAuthHoc>{children}</UnAuthHoc>;
};

export default AuthLayout;
