import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Input } from "@mantine/core";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Container>
        {" "}
        <h1 className="text-[36px] font-bold">Login</h1>
        <Input
          className="w-full"
          classNames={{
            wrapper:
              "border border-[#4BB9B3E5] rounded-[28px] text-[#4BB9B3E5]",
          }}
          placeholder="email"
        />
        <Input
          className="w-full"
          type="password"
          classNames={{
            wrapper:
              "border border-[#4BB9B3E5] rounded-[28px] text-[#4BB9B3E5]",
          }}
          placeholder="password"
        />
        <PrimaryButton>Login</PrimaryButton>
        <span>
          Don't have an account?{" "}
          <span
            className="underline cursor-pointer text-[#4BB9B3E5]"
            onClick={() => {
              navigate("/signup");
            }}
          >
            {" "}
            Sign Up
          </span>
        </span>
      </Container>
    </MainLayout>
  );
}

export default LoginPage;
