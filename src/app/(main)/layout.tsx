"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PostDetailModal from "@/components/ui/PostDetailModal";
import AuthHoc from "@/hoc/AuthHoc";
import { clearSelectedPost } from "@/redux/slices/postSlice";
import { persistor, useAppSelector } from "@/redux/store";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const selectedPost = useAppSelector((state) => state.post.selectedPost);
  const dispatch = useDispatch();

  return (
    <AuthHoc>
      <PersistGate persistor={persistor}>
        <main className="">
          <Header />
          <Sidebar />
          <div className="mt-16 ml-64">{children}</div>
          <PostDetailModal
            isOpen={!!selectedPost}
            onClose={() => dispatch(clearSelectedPost())}
            post={selectedPost}
          />
        </main>
      </PersistGate>
    </AuthHoc>
  );
};

export default MainLayout;
