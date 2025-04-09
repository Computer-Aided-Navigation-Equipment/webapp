import { Loader, PasswordInput } from "@mantine/core";
import axiosRequest from "../utils/axiosConfig";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import PrimaryButton from "../components/PrimaryButton";
import EyeIcon from "../icons/EyeIcon";
import EyeSlashIcon from "../icons/EyeSlashIcon";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";

function ResetpasswordWithTokenPage() {
  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? <EyeIcon /> : <EyeSlashIcon />;

  const { token } = useParams<{ token: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) => {
        if (!value) return "Password is required";
      },
      confirmPassword: (value, values) => {
        if (!value) return "Password is required";

        if (value !== values.password) return "Password does not match";
      },
    },
  });

  const handleResetPassword = async () => {
    setIsLoading(true);
    axiosRequest
      .post(`/user/reset-password/${token}`, {
        password: form.values.password,
      })
      .then(() => {
        toast.success("Password reset successfully!");
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
      {/* Left image section */}

      {/* Right form section */}
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-[16px]">
          <h1 className="font-outfit text-[52px]">Reset Password</h1>
          <span className="text-[18px] font-outfit gap-[10px] flex">
            Remember your password?{" "}
            <span
              className="underline text-[var(--primary-color)] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </span>
        </div>

        {/* Password Fields */}
        <form
          className="flex flex-col gap-[16px]"
          onSubmit={form.onSubmit(handleResetPassword)}
        >
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="New Password"
            visibilityToggleIcon={VisibilityToggleIcon}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            withAsterisk
            label="Confirm Password"
            placeholder="Confirm New Password"
            visibilityToggleIcon={VisibilityToggleIcon}
            {...form.getInputProps("confirmPassword")}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <PrimaryButton type="submit">Reset Password</PrimaryButton>
          )}
        </form>

        {/* Submit Button */}
      </Container>
    </MainLayout>
  );
}

export default ResetpasswordWithTokenPage;
