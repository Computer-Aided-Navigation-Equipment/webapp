import React from "react";
import MainLayout from "../layouts/MainLayout";

function AboutUsPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-[20px] h-full">
        <div className="bg-[#4BB9B312] h-[170px] flex text-[40px] font-bold w-full justify-center items-center">
          About Us
        </div>
        <div>
          <p className="text-[20px] p-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            malesuada, eros sit amet fermentum lacinia, elit nunc ultricies
            libero, vel ultricies odio mi in sapien. Nullam nec nunc et elit
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default AboutUsPage;
