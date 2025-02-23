import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { Select, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import axiosRequest from "../utils/axiosConfig";

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
      setUser(response.data);
      form.setValues(response.data);
    });
  }, []);
  return (
    <MainLayout>
      {" "}
      <Container>
        <h1 className="text-[36px] font-bold">Profile</h1>
        <img />
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <span>User Information</span>
            <form className="flex flex-col gap-[10px] w-full">
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
            </form>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}

export default ProfilePage;
