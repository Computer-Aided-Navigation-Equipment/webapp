// Importing React to use JSX and create components
import React from "react";

// Importing a custom icon component (SpeechIcon) which might be used in the UI (though it's not used directly here)
import SpeechIcon from "../icons/SpeechIcon";

// Importing useNavigate from React Router to programmatically navigate between routes
import { useNavigate } from "react-router-dom";

// Defining the props the AdminNavItem component expects
interface Props {
  icon: React.ReactNode; // The icon to display in the navigation item
  text: string;          // The label/text to show under the icon
  route: string;         // The route to navigate to when the item is clicked
}

// Functional component for a navigation item in the admin panel
function AdminNavItem({ icon, text, route }: Props) {
  // Hook from React Router to enable navigation
  const navigate = useNavigate();

  return (
    // Main container div for the navigation item
    <div
      // Styling the item with fixed height/width, padding, border, rounded corners, background color, etc.
      className="h-[200px] w-[150px] relative cursor-pointer justify-center flex flex-col items-center gap-[10px] p-[20px] border border-[#0000004F] rounded-[20px] bg-[#EDFFFE]"
      style={{
        // Adding a subtle drop shadow for visual depth
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
      // Navigates to the given route when the div is clicked
      onClick={() => {
        navigate(route);
      }}
    >
      {/* Rendering the icon passed in as a prop */}
      {icon}
      {/* Rendering the text label below the icon */}
      <span
        className="text-[24px] text-[#000000]  text-center"
        style={{ fontWeight: 100 }} // Light font weight for a minimalist look
      >
        {text}
      </span>
    </div>
  );
}

// Exporting the component for use in other parts of the application
export default AdminNavItem;
