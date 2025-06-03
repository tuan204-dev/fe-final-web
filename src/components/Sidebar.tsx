"use client";

import { useUsers } from "@/hooks/user";
import React from "react";
import UserCard from "./ui/UserCard";

const Sidebar = () => {
  const { users } = useUsers();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed top-16 left-0 h-[calc(100vh-56px)]">
      <div className="p-4">
        {/* <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Online Friends
        </h2> */}

        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-120px)]">
          {users?.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
