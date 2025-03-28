import React from "react";
import MainLayout from "../layouts/MainLayout";
import NavigationIcon from "../icons/NavigationIcon";
import NavItem from "../components/NavItem";
import ContactsIcon from "../icons/ContactsIcon";
import LocationsIcon from "../icons/LocationsIcon";
import PathIcon from "../icons/PathIcon";
import { Textarea, TextInput } from "@mantine/core";
import PrimaryButton from "../components/PrimaryButton";
import SpeechIcon from "../icons/SpeechIcon";
import { UserData } from "../utils/userData";
import AdminNavItem from "../components/AdminNavItem";
import ManageUsersIcon from "../icons/ManageUsersIcon";
import ActivityLogIcon from "../icons/ActivityLogIcon";
import EmergencyAlertsIcon from "../icons/EmergencyAlertsIcon";
import FeedbackIcon from "../icons/FeedbackIcon";

function UserHomePage() {
  const userData: any = UserData();
  console.log(userData);
  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-[20px] h-full w-full">
        <div className="bg-[#4BB9B312] h-[170px] flex text-[40px] font-bold w-full justify-center items-center">
          Welcome to Smart Cane website
        </div>
        <div className="flex flex-col gap-[20px] items-center w-full">
          <div className="flex items-center gap-[10px]">
            <span className="text-[20px]">My current location</span>
            <Textarea
              placeholder="Harmony Plaza, Building 12434"
              className="min-w-[300px]"
              rightSection={
                <div className="mr-[10px] cursor-pointer">
                  <SpeechIcon />
                </div>
              }
            />
            <PrimaryButton classname="min-w-auto">Feedback</PrimaryButton>
          </div>
          {userData && ["user", "caregiver"].includes(userData.userType) && (
            <div className="flex items-center justify-around w-full">
              <NavItem
                text="Navigation"
                icon={<NavigationIcon />}
                route="/navigation"
              />
              <NavItem
                text="Saved Contacts"
                icon={<ContactsIcon />}
                route="/contacts"
              />
              <NavItem
                text="Saved Locations"
                icon={<LocationsIcon />}
                route="/locations"
              />
              <NavItem
                text="Begin Path"
                icon={<PathIcon />}
                route="/begin-path/tunis"
              />
            </div>
          )}
          {userData && ["admin"].includes(userData.userType) && (
            <div className="flex items-center justify-around w-full">
              <AdminNavItem
                text="Manage Users"
                icon={<ManageUsersIcon />}
                route="/manage-users"
              />
              <AdminNavItem
                text="Activity Log"
                icon={<ActivityLogIcon />}
                route="/activity-log"
              />
              <AdminNavItem
                text="Emergency Alerts"
                icon={<EmergencyAlertsIcon />}
                route="/emergecy-alerts"
              />
              <AdminNavItem
                text="Feedback Submissions"
                icon={<FeedbackIcon />}
                route="/feedback-log"
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default UserHomePage;
