import React from "react";
import MainLayout from "../layouts/MainLayout";

function AboutUsPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-[20px] h-full w-full">
        <div className="bg-[#4BB9B312] h-[170px] flex text-[40px] font-bold w-full justify-center items-center">
          About Us
        </div>
        <div>
          <p className="text-[20px] p-[20px]">
          At Smart CANE, our mission is to enhance the lives of individuals with visual impairments through innovative technology. Our Smart Cane combines traditional mobility assistance with modern features like obstacle detection, GPS navigation, and emergency alerts.
          </p>
          <p className="text-[20px] p-[20px]">
          We're dedicated to creating accessible solutions that empower users to navigate the world with confidence and independence.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default AboutUsPage;
