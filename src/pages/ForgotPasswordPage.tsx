import React from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { Input, Loader, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import PrimaryButton from "../components/PrimaryButton";
import axiosRequest from "../utils/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value))
          return "Invalid email";
      },
    },
  });

  const handleForgetPassword = async () => {
    setIsLoading(true);
    axiosRequest
      .post("/user/forgot-password", {
        email: form.values.email,
      })
      .then(() => {
        toast.success("Password reset link sent! Check your email.");
        navigate("/login");
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
          return;
        }
        toast.error("An error occurred. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <MainLayout>
      <Container>
        <h1 className="text-[36px] font-bold">Reset Password</h1>
        <form
          className="flex flex-col gap-[10px] w-full"
          onSubmit={form.onSubmit(handleForgetPassword)}
        >
          <TextInput placeholder="Email" {...form.getInputProps("email")} />
          {isLoading ? (
            <Loader />
          ) : (
            <PrimaryButton type="submit">Send Verification Code</PrimaryButton>
          )}
        </form>
      </Container>
    </MainLayout>
  );
}

export default ForgotPasswordPage;
