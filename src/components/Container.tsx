// Importing React to enable JSX and component creation
import React from "react";

// Functional component called Container which takes children as a prop
function Container({ children }: { children: React.ReactNode }) {
  return (
    // Main wrapper div for the container
    <div
      // Applying Tailwind CSS classes for layout and styling
      className="flex flex-col items-center bg-[#F5F5F5] px-[100px] py-[50px] rounded-[28px] gap-[10px]"
      style={{
        // Adding a subtle box shadow to give the container depth
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Rendering any child components or elements passed to this container */}
      {children}
    </div>
  );
}

// Exporting the Container component for use in other parts of the app
export default Container;
