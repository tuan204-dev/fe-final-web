"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AuthHoc from "@/hoc/AuthHoc";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthHoc>
      <main className="">
        <Header />
        <Sidebar />
        <div className="mt-16 ml-64">{children}</div>
      </main>
    </AuthHoc>
  );
};

export default MainLayout;
