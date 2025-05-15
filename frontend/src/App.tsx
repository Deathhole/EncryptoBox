// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ColorModeContext, useMode } from "./app/theme/theme";

// Pages
import Home from "./app/pages/Home";
import Encrypt from "./app/pages/Encrypt";
import Decrypt from "./app/pages/Decrypt";
import Login from "./app/pages/Login";
import Signup from "./app/pages/Signup";
import AdminDashboard from "./app/pages/AdminDashboard";
import VerifyEmail from "./app/pages/VerifyEmail";
import About from "./app/pages/About";  
import PrivacyPolicy from "./app/pages/PrivacyPolicy";  // <-- Import PrivacyPolicy page

// Components
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const HIDE_TOPBAR_PATHS = ["/login", "/signup", "/verify-email"];

const AppContent = () => {
  const location = useLocation();
  const hideTopbar = HIDE_TOPBAR_PATHS.includes(location.pathname);

  // Hide footer on the same routes as topbar
  const hideFooter = hideTopbar;

  return (
    <>
      {!hideTopbar && <Topbar />}

      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} /> {/* About page */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Privacy Policy page */}

        {/* 🔐 Protected Routes */}
        <Route
          path="/encrypt"
          element={
            <ProtectedRoute>
              <Encrypt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/decrypt"
          element={
            <ProtectedRoute>
              <Decrypt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
};

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position="top-right" autoClose={3000} />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
