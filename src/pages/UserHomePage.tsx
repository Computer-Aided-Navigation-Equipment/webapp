import React from "react";
import MainLayout from "../layouts/MainLayout";
import NavigationIcon from "../icons/NavigationIcon";
import SpeechIcon from "../icons/SpeechIcon";
import NavItem from "../components/NavItem";
import ContactsIcon from "../icons/ContactsIcon";
import LocationsIcon from "../icons/LocationsIcon";
import PathIcon from "../icons/PathIcon";

function UserHomePage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-[20px] h-full w-full">
        <div className="bg-[#4BB9B312] h-[170px] flex text-[40px] font-bold w-full justify-center items-center">
          Welcome to Smart Cane website
        </div>
        <div className="flex flex-col gap-[10px] items-center w-full">
          <div></div>
          <div className="flex items-center justify-around w-full">
            <NavItem text="Navigation" icon={<NavigationIcon />} />
            <NavItem text="Saved Contacts" icon={<ContactsIcon />} />
            <NavItem text="Saved Locations" icon={<LocationsIcon />} />
            <NavItem text="Begin Path" icon={<PathIcon />} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default UserHomePage;
