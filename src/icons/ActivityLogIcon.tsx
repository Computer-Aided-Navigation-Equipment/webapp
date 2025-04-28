// Importing React to use JSX and define functional components
import React from "react";

// Functional component that returns an SVG icon for an activity log
function ActivityLogIcon() {
  return (
    // Defining the SVG element that represents the icon
    <svg
      xmlns="http://www.w3.org/2000/svg" // Declares SVG namespace
      width={53}                         // Width of the SVG
      height={53}                        // Height of the SVG
      viewBox="0 0 53 53"                // Coordinates system for the icon's drawing
      fill="none"                        // No fill color by default; only stroke will be used
    >
      {/* Defining the shape/path of the icon using SVG path element */}
      <path
        d="
          M5.2998 47.7L5.3007 39.7491C5.30119 35.3588 8.86038 31.8 13.2507 31.8H27.8248
          M37.0998 24.8911L42.3998 19.2125
          M42.3998 19.2125L47.6998 24.8911
          M42.3998 19.2125V33.7875
          M31.7998 13.25C31.7998 17.6407 28.2405 21.2 23.8498 21.2C19.4591 21.2 15.8998 17.6407 15.8998 13.25C15.8998 8.85934 19.4591 5.3 23.8498 5.3C28.2405 5.3 31.7998 8.85934 31.7998 13.25Z
        "
        stroke="black"           // Color of the line
        strokeWidth={2}          // Thickness of the line
        strokeLinecap="round"    // Round line ends for a cleaner look
        strokeLinejoin="round"  // Rounded corners where lines join
      />
    </svg>
  );
}

// Exporting the component so it can be used elsewhere in the application
export default ActivityLogIcon;
