import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { Select, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import axiosRequest from "../utils/axiosConfig";
import PrimaryButton from "../components/PrimaryButton";
import Cookies from "js-cookie";
import UserIcon from "../icons/UserIcon";
import toast from "react-hot-toast";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      address: "",
      dateOfBirth: "",
      userType: "",
    },
    validate: {
      firstName: (value) => value.length < 1 && "First Name is required",
      lastName: (value) => value.length < 1 && "Last Name is required",
      email: (value) =>
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) &&
        "Invalid email address",
      phoneNumber: (value) => {
        if (!value) {
          return "Phone Number is required";
        }
      },

      address: (value) => value.length < 1 && "Address is required",
      dateOfBirth: (value) => value.length < 1 && "Date of Birth is required",
      userType: (value) => value.length < 1 && "User Type is required",
    },
  });

  useEffect(() => {
    axiosRequest.get("/user/profile").then((response) => {
      setUser(response.data.user);
      form.setValues(response.data.user);
    });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    Cookies.remove("refreshToken");
    navigate("/login");
  };

  const handleSaveChanges = () => {
    axiosRequest
      .post("/user/update", form.values)
      .then((response) => {
        toast.success("Profile updated successfully");
      })
      .catch((err) => {
        if (err.response.data.message) {
          return toast.error(err.response.data.message);
        }
        toast.error("Error updating profile");
      });
  };
  return (
    <MainLayout>
      {" "}
      <Container>
        <h1 className="text-[36px] font-bold">Profile</h1>
        <div className="h-[100px] w-[100px] rounded-full bg-[#4BB9B3E5] flex items-center justify-center">
          <UserIcon />
        </div>
        <div className="flex justify-between w-full items-start gap-[20px]">
          <div className="flex flex-col items-center w-full">
            <span className="text-[16px]">User Information</span>
            <form
              className="flex flex-col gap-[10px] w-full"
              onSubmit={form.onSubmit(handleSaveChanges)}
            >
              <TextInput
                placeholder="First Name"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                placeholder="Last Name"
                {...form.getInputProps("lastName")}
              />
              <TextInput placeholder="Email" {...form.getInputProps("email")} />
              <TextInput
                placeholder="Phone Number"
                {...form.getInputProps("phoneNumber")}
              />
              <TextInput
                placeholder="Address"
                {...form.getInputProps("address")}
              />
              <TextInput
                placeholder="Date of Birth"
                type="date"
                {...form.getInputProps("dateOfBirth")}
              />
              <Select
                placeholder="User Type"
                data={["user", "caregiver"]}
                {...form.getInputProps("userType")}
              />
              <PrimaryButton type="submit">Save Changes</PrimaryButton>
            </form>
          </div>
          <div className="flex flex-col items-center w-full">
            <span className="text-[16px]">Device information</span>
            <div className="flex flex-col gap-[10px] w-full border border-[#4BB9B3E5] rounded-[28px] p-[30px]">
              <span>Device Name</span>
              <span>Cane connection status</span>
              <span>Cane battery life</span>
              <span>Latest update</span>
              <span className="underline text-[#276BE8]">Connect Device</span>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <PrimaryButton onClick={handleLogout} classname="w-full">
            Logout
          </PrimaryButton>
        </div>
      </Container>
    </MainLayout>
  );
}

export default ProfilePage;
