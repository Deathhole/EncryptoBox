import React from "react";
import { toast } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./app/theme/theme";

// Pages
import Home from "./app/pages/Home";
import Encrypt from "./app/pages/Encrypt";
import Decrypt from "./app/pages/Decrypt";
import Login from "./app/pages/Login";
import Signup from "./app/pages/Signup";
import AdminDashboard from "./app/pages/AdminDashboard";
import VerifyEmail from "./app/pages/VerifyEmail";

// Components
import Topbar from "./components/Topbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* 🔓 Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* 🔐 Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <>
                    <Topbar />
                    <Home />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/encrypt"
              element={
                <ProtectedRoute>
                  <>
                    <Topbar />
                    <Encrypt />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/decrypt"
              element={
                <ProtectedRoute>
                  <>
                    <Topbar />
                    <Decrypt />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <>
                    <Topbar />
                    <AdminDashboard />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
