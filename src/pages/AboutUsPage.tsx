import React from "react"; // Import React
import MainLayout from "../layouts/MainLayout"; // Import the MainLayout component for consistent page layout

// Functional component for the About Us page
function AboutUsPage() {
  return (
    // Wrap the content with MainLayout to include the header and layout styling
    <MainLayout>
      {/* Main content container */}
      <div className="flex flex-col items-center gap-[20px] h-full w-full">
        {/* Top banner section with title */}
        <div className="bg-[#4BB9B312] h-[170px] flex text-[40px] font-bold w-full justify-center items-center">
          About Us
        </div>

        {/* Descriptive text content */}
        <div>
          <p className="text-[20px] p-[20px]">
            At Smart CANE, our mission is to enhance the lives of individuals
            with visual impairments through innovative technology. Our Smart
            Cane combines traditional mobility assistance with modern features
            like obstacle detection, GPS navigation, and emergency alerts.
          </p>
          <p className="text-[20px] p-[20px]">
            We're dedicated to creating accessible solutions that empower users
            to navigate the world with confidence and independence.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default AboutUsPage; // Export the component so it can be used in the app
