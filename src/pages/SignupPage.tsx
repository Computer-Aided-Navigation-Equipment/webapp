import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Input, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";
function SignupPage() {
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
      phoneNumber: (value) =>
        !/^\d{10}$/i.test(value) && "Invalid phone number",
      password: (value) =>
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value) &&
        "Password must contain at least 8 characters, one letter and one number",
      address: (value) => value.length < 1 && "Address is required",
      dateOfBirth: (value) => value.length < 1 && "Date of Birth is required",
      userType: (value) => value.length < 1 && "User Type is required",
    },
  });

  const handleUserRegister = () => {
    console.log("User Registered");
  };
  return (
    <MainLayout>
      <Container>
        <h1 className="text-[32px] font-bold">Sign Up</h1>
        <form
          className="flex flex-col gap-[10px]"
          onSubmit={form.onSubmit(handleUserRegister)}
        >
          <div className="flex items-center gap-[10px]">
            <TextInput
              placeholder="First Name"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              placeholder="Last Name"
              {...form.getInputProps("lastName")}
            />
          </div>
          <TextInput placeholder="Email" {...form.getInputProps("email")} />
          <TextInput
            placeholder="Phone Number"
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            placeholder="Password"
            type="password"
            {...form.getInputProps("password")}
          />
          <TextInput placeholder="Address" {...form.getInputProps("address")} />
          <TextInput
            placeholder="Date of Birth"
            type="date"
            {...form.getInputProps("dateOfBirth")}
          />
          <Select
            data={["user", "caregiver", "admin"]}
            placeholder="User Type"
            {...form.getInputProps("userType")}
          />
          <PrimaryButton type="submit">Sign Up</PrimaryButton>
        </form>
      </Container>
    </MainLayout>
  );
}

export default SignupPage;
