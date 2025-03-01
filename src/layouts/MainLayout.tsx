import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
interface MainLayoutProps {
  children: React.ReactNode;
}
function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col gap-[10px]">
      <div className="bg-[#4BB9B324] h-[75px] justify-between flex px-[10px]">
        <img src={logo} alt="logo" />
        <div className="flex items-center gap-[70px] pr-[40px]">
          <span
            className="cursor-pointer text-[20px]"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </span>
          <span
            className="cursor-pointer text-[20px]"
            onClick={() => {
              navigate("/about-us");
            }}
          >
            About Us
          </span>
          <span
            className="cursor-pointer text-[20px]"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
}

export default MainLayout;
