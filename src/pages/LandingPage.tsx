import MainLayout from "../layouts/MainLayout";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div
        className="flex flex-col items-center bg-[#F5F5F5] px-[100px] py-[50px] rounded-[28px]"
        style={{
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <h1>Welcome!</h1>
        <div className="flex flex-col items-center gap-[10px]">
          <PrimaryButton
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </PrimaryButton>
          <span className="text-[#4BB9B3]">About us</span>
        </div>
      </div>
    </MainLayout>
  );
}

export default LandingPage;
