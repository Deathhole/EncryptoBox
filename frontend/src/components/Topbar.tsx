// src/components/Topbar.tsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu"; // ✅ Import your enhanced profile menu
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/api/firebaseConfig";

const Topbar: React.FC = () => {
  const [user] = useAuthState(auth);

  // TODO: Replace this logic with your actual admin-check logic
  const isAdmin = user?.email === "admin@example.com"; // 🔒 Replace with dynamic check

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#000",
        paddingY: "4px",
        borderBottom: "2px solid #ff1744",
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo and Title */}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          component={Link}
          to="/home"
          sx={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "#ff1744",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            E
          </Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.25rem",
            }}
          >
            EncryptoBox
          </Typography>
        </Box>

        {/* ProfileMenu */}
        {user && (
          <Box>
            <ProfileMenu isAdmin={isAdmin} />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
