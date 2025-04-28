// Importing React to enable JSX syntax and functional components
import React from "react";

// Importing a custom icon (not used directly in this file but may be referenced from parent)
import SpeechIcon from "../icons/SpeechIcon";

// Importing the useNavigate hook from React Router to enable navigation on user interaction
import { useNavigate } from "react-router-dom";

// Defining the type for the props that this component expects
interface Props {
  icon: React.ReactNode; // A React element (usually an icon) to display
  text: string;          // A string to label the nav item
  route: string;         // The route to navigate to when the item is clicked
}

// Functional component for a reusable navigation item
function NavItem({ icon, text, route }: Props) {
  // useNavigate hook gives access to navigation functionality
  const navigate = useNavigate();

  return (
    // Main clickable card-like container
    <div
      // Utility classes to style the card: fixed height/width, center contents, spacing, border, background, etc.
      className="h-[200px] w-[150px] relative cursor-pointer justify-center flex flex-col items-center gap-[10px] p-[20px] border border-[#0000004F] rounded-[20px] bg-[#EDFFFE]"
      style={{
        // Inline style to apply a subtle box shadow for visual depth
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
      // Navigates to the provided route when the container is clicked
      onClick={() => {
        navigate(route);
      }}
    >
      {/* Displays the icon passed as a prop */}
      {icon}
      {/* Displays the text below the icon */}
      <span
        className="text-[24px] text-[#000000]  text-center" // Tailwind classes for size, color, and alignment
        style={{ fontWeight: 100 }} // Very light font weight for a clean aesthetic
      >
        {text}
      </span>
    </div>
  );
}

// Exporting the component for use in other parts of the app
export default NavItem;
