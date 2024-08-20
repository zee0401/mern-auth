import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FloatingShape from "./components/FloatingShape";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import EmailVerificationPage from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/Dashboard";
import {
  ProtectedRoutes,
  RedirectAuthenticatedUser,
} from "./utils/protectedRoutes";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br
  from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
