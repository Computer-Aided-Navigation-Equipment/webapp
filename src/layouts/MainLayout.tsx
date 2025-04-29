import React from "react";  // Import React
import logo from "../assets/logo.png";  // Import the logo image
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for navigation

// Define the type for the props passed to MainLayout, where 'children' is the content to be rendered inside the layout
interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  // Initialize the navigate function from React Router
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col gap-[10px]">
      {/* Header section with logo and navigation links */}
      <div className="bg-[#4BB9B324] h-[75px] justify-between flex px-[10px]">
        {/* Logo image */}
        <img src={logo} alt="logo" />
        <div className="flex items-center gap-[70px] pr-[40px]">
          {/* Navigation links */}
          <span
            className="cursor-pointer text-[20px]"
            onClick={() => {
              // Navigate to the home page
              navigate("/");
            }}
          >
            Home
          </span>
          <span
            className="cursor-pointer text-[20px]"
            onClick={() => {
              // Navigate to the About Us page
              navigate("/about-us");
            }}
          >
            About Us
          </span>
          <span
            className="cursor-pointer text-[20px]"
            onClick={() => {
              // Navigate to the Profile page
              navigate("/profile");
            }}
          >
            Profile
          </span>
        </div>
      </div>

      {/* Main content area where children (passed content) will be rendered */}
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
}

export default MainLayout;
