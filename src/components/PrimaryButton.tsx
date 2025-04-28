// Importing React to use JSX and create functional components
import React from "react";

// Defining the type for props expected by the PrimaryButton component
interface Props {
  children: React.ReactNode;       // Content to display inside the button (text or elements)
  onClick?: () => void;            // Optional click handler function
  type?: "button" | "submit" | "reset"; // Optional button type; defaults to "button"
  classname?: string;              // Optional additional class names for customization
}

// Defining the functional component for a styled primary button
function PrimaryButton({
  children,        // Destructuring children from props
  type = "button", // Defaulting type to "button" if not provided
  onClick,         // Destructuring optional onClick handler
  classname,       // Destructuring optional additional class names
}: Props) {
  return (
    // Rendering a <button> element with styling and behavior
    <button
      // Combining default styles with any additional className passed in
      className={`bg-[#4BB9B3] text-[16px] rounded-[20px] px-[24px] py-[12px] border-0 text-[white] h-[48px] min-w-[300px] ${classname}`}
      type={type}        // Setting the button type ("button", "submit", or "reset")
      onClick={onClick}  // Assigning the click event handler if provided
      style={{ fontWeight: "bold" }} // Inline style to apply bold font weight
    >
      {/* Rendering the content inside the button */}
      {children}
    </button>
  );
}

// Exporting the button component so it can be used in other parts of the application
export default PrimaryButton;
