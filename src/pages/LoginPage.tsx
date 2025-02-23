import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Input } from "@mantine/core";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../utils/axiosConfig";
import toast from "react-hot-toast";
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    axiosRequest
      .post("/user/login", {
        email,
        password,
      })
      .then((response) => {
        navigate("/navigation");
      })
      .catch((err) => {
        if (err.response.data.message) {
          return toast.error(err.response.data.message);
        }
        toast.error("An error occurred");
      });
  };
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
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          className="w-full"
          type="password"
          classNames={{
            wrapper:
              "border border-[#4BB9B3E5] rounded-[28px] text-[#4BB9B3E5]",
          }}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
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
