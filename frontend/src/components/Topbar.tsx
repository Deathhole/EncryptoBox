import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/api/firebaseConfig";
import EncryptoBoxLogo from "./EncryptoBoxLogo";

const navLinks = [
  { label: "Home", path: "/home" },
  { label: "Encrypt", path: "/encrypt" },
  { label: "Decrypt", path: "/decrypt" },
];

const Topbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const isAdmin = user?.email === "admin@example.com";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#000",
          borderBottom: "2px solid #ff1744",
          paddingY: "4px",
          zIndex: 1201,
        }}
        elevation={0}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            component={Link}
            to="/home"
            sx={{ textDecoration: "none" }}
          >
            <EncryptoBoxLogo size={36} />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: "#fff",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.25rem",
                "&:hover": { color: "#ff1744" },
                // Removed the extra blinking cursor-like bar
                borderRight: "none"
              }}
            >
              EncryptoBox
            </Typography>
          </Box>

          {/* Center Navigation (Desktop) */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Stack direction="row" spacing={4}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Button
                    key={link.label}
                    component={Link}
                    to={link.path}
                    sx={{
                      color: isActive ? "#ff1744" : "#ccc",
                      borderBottom: isActive
                        ? "2px solid #ff1744"
                        : "2px solid transparent",
                      borderRadius: 0,
                      fontWeight: "medium",
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: "none",
                      transition: "color 0.3s, border-bottom 0.3s",
                      "&:hover": {
                        color: "#ff1744",
                        borderBottom: "2px solid #ff1744",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Stack>
          </Box>

          {/* Right Side (Login/Signup or Profile) */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user ? (
              <ProfileMenu isAdmin={isAdmin} />
            ) : location.pathname === "/home" ? (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  borderColor: "#ff1744",
                  color: "#ff1744",
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#ff1744",
                    color: "#fff",
                    borderColor: "#ff1744",
                  },
                }}
              >
                Login / Signup
              </Button>
            ) : null}
          </Box>

          {/* Hamburger (Mobile) */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, backgroundColor: "#000", height: "100%", color: "#fff" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  sx={{
                    color: location.pathname === link.path ? "#ff1744" : "#fff",
                    "&:hover": { backgroundColor: "#1a1a1a" },
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {!user && location.pathname === "/home" && (
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/login">
                  <ListItemText primary="Login / Signup" />
                </ListItemButton>
              </ListItem>
            )}

            {user && (
              <ListItem disablePadding>
                <Box px={2} pt={2}>
                  <ProfileMenu isAdmin={isAdmin} />
                </Box>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Topbar;
