import MainLayout from "../layouts/MainLayout";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Container>
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
      </Container>{" "}
    </MainLayout>
  );
}

export default LandingPage;
