import { MdOutlineLogout } from "react-icons/md";
import { useAppSelector } from "@/redux/store";
import { Button, Checkbox, Dropdown } from "antd";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthServices from "@/services/authServices";
import { useDispatch } from "react-redux";
import { setViewAdvanced } from "@/redux/slices/viewSlice";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.auth.user);
  const isAdvancedView = useAppSelector((state) => state.view.isAdvancedView);
  const dispatch = useDispatch();

  const fullName = useMemo(
    () => currentUser?.firstName + " " + currentUser?.lastName,
    [currentUser]
  );

  const handleLogout = async () => {
    try {
      await AuthServices.logout();
      toast.success("Logout successful");
      router.push("/auth/login");
    } catch (e) {
      console.log(e);
      toast.error("Logout failed. Please try again later.");
    }
  };

  return (
    <header className="h-16 top-0 left-0 right-0 fixed z-10 bg-white border-b border-gray-200 px-5 flex items-center justify-between">
      <Link href={"/"} className="">
        <h1 className="text-xl font-bold text-gray-800">Photo App</h1>
        <p className="text-sm text-gray-500">Connect with friends</p>
      </Link>

      <div className="flex items-center gap-x-3">
        <Link href={"/post/create"}>
          <Button type="primary">Create Post</Button>
        </Link>

        <Checkbox
          checked={isAdvancedView}
          onChange={(e) => dispatch(setViewAdvanced(e.target.checked))}
        >
          Advanced View
        </Checkbox>

        <Dropdown
          menu={{
            items: [
              {
                key: "logout",
                icon: <MdOutlineLogout />,
                label: "Logout",
                onClick: handleLogout,
              },
            ],
          }}
        >
          <div className="flex items-center space-x-3 cursor-pointer">
            {/* <img
                src="https://randomuser.me/api/portraits/men/42.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              /> */}
            <div>
              <p className="text-sm font-medium text-gray-800">{fullName}</p>
              <p className="text-xs text-gray-500">@{currentUser?.loginName}</p>
            </div>
            <i className="fas fa-chevron-down text-gray-500 text-sm"></i>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
