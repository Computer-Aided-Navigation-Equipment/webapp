import React from "react";
import logo from "../assets/logo.png";
interface MainLayoutProps {
  children: React.ReactNode;
}
function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-full w-full">
      <div className="bg-[#4BB9B324] h-[75px] justify-between flex px-[10px]">
        <img src={logo} alt="logo" />
        <div className="flex items-center gap-[70px] pr-[40px]">
          <span className="cursor-pointer text-[20px]">Home</span>
          <span className="cursor-pointer text-[20px]">Home</span>
          <span className="cursor-pointer text-[20px]">Home</span>
        </div>
      </div>

      <div className="flex justify-center items-center h-[calc(100vh-75px)]">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
