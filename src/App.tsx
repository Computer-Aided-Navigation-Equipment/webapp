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
import NavigationPage from "./pages/NavigationPage";
import UnauthorizedRoute from "./routes/UnauthorizedRoute";
import ProfilePage from "./pages/ProfilePage";
import ContactsPage from "./pages/ContactsPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <UnauthorizedRoute redirectTo="/user-home">
              <LandingPage />
            </UnauthorizedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UnauthorizedRoute redirectTo="/user-home">
              <LoginPage />
            </UnauthorizedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UnauthorizedRoute redirectTo="/user-home">
              <SignupPage />
            </UnauthorizedRoute>
          }
        />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route
          path="/reset-password"
          element={
            <UnauthorizedRoute redirectTo="/dashboard">
              <ResetPasswordPage />
            </UnauthorizedRoute>
          }
        />
        <Route path="/user-home" element={<UserHomePage />} />
        <Route path="/navigation" element={<NavigationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contacts" element={<ContactsPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
