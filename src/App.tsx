import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutUsPage from "./pages/AboutUsPage";
import ResetPasswordPage from "./pages/ForgotPasswordPage";
import UserHomePage from "./pages/UserHomePage";
import NavigationPage from "./pages/NavigationPage";
import UnauthorizedRoute from "./routes/UnauthorizedRoute";
import ProfilePage from "./pages/ProfilePage";
import ContactsPage from "./pages/ContactsPage";
import LocationsPage from "./pages/LocationsPage";
import BeginPathPage from "./pages/BeginPathPage";
import FeedbackPage from "./pages/FeedbackPage";
import ManageUsersPage from "./pages/ManageUsersPage";
import UserActivityLogPage from "./pages/UserActivityLogPage";
import UserAlertsPage from "./pages/UserAlertsPage";
import AdminFeedbacks from "./pages/AdminFeedbacks";
import ResetpasswordWithTokenPage from "./pages/ResetPasswordWithTokenPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

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
          path="/forgot-password"
          element={
            <UnauthorizedRoute redirectTo="/dashboard">
              <ForgotPasswordPage />
            </UnauthorizedRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={<ResetpasswordWithTokenPage />}
        />

        <Route path="/user-home" element={<UserHomePage />} />
        <Route path="/navigation" element={<NavigationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/begin-path/:location" element={<BeginPathPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/manage-users" element={<ManageUsersPage />} />
        <Route path="/activity-log/:userId" element={<UserActivityLogPage />} />
        <Route path="/alert-log/:userId" element={<UserAlertsPage />} />
        <Route path="/feedback-log" element={<AdminFeedbacks />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
