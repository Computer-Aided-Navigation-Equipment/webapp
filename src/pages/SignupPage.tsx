import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Center, Input, Loader, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";
import axiosRequest from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function SignupPage() {
  const navigate = useNavigate();
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
      password: (value) => {
        if (!value) {
          return "Password is required";
        }
      },
      address: (value) => value.length < 1 && "Address is required",
      dateOfBirth: (value) => value.length < 1 && "Date of Birth is required",
      userType: (value) => value.length < 1 && "User Type is required",
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const handleUserRegister = () => {
    setIsLoading(true);
    axiosRequest
      .post("/user/register", form.values)
      .then((response) => {
        navigate("/navigation");
      })
      .catch((err) => {
        if (err.response.data.message) {
          return toast.error(err.response.data.message);
        }
        toast.error("An error occurred while signing up");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <MainLayout>
      <Container>
        <h1 className="text-[32px] font-bold">Sign Up</h1>
        {isLoading ? (
          <Loader />
        ) : (
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
              data={["user", "caregiver"]}
              placeholder="User Type"
              {...form.getInputProps("userType")}
            />
            <PrimaryButton type="submit">Sign Up</PrimaryButton>
          </form>
        )}
      </Container>
    </MainLayout>
  );
}

export default SignupPage;
