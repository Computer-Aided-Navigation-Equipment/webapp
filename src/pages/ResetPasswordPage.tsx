import React from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { Input, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import PrimaryButton from "../components/PrimaryButton";

function ResetPasswordPage() {
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) &&
        "Invalid email address",
    },
  });

  const handleResetPassword = () => {
    console.log("Reset Password");
  };
  return (
    <MainLayout>
      <Container>
        <h1 className="text-[36px] font-bold">Reset Password</h1>
        <form
          className="flex flex-col gap-[10px] w-full"
          onSubmit={form.onSubmit(() => {})}
        >
          <TextInput placeholder="Email" {...form.getInputProps("email")} />
          <PrimaryButton type="submit">Send Verification Code</PrimaryButton>
        </form>
      </Container>
    </MainLayout>
  );
}

export default ResetPasswordPage;
