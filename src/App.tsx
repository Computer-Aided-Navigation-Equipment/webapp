import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutUsPage from "./pages/AboutUsPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UserHomePage from "./pages/UserHomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/user-home" element={<UserHomePage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
