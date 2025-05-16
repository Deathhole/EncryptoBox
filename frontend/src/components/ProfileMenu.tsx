import React, { useState, useContext, useEffect } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Box,
  IconButton,
  Tooltip,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import {
  Logout,
  AdminPanelSettings,
  Email,
  CheckCircle,
  HelpOutline,
  Policy,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../app/theme/theme";
import { auth } from "../app/api/firebaseConfig";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";

interface Props {
  isAdmin: boolean;
}

const ProfileMenu: React.FC<Props> = ({ isAdmin }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await auth.signOut();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleResendVerification = async () => {
    try {
      if (currentUser && !currentUser.emailVerified) {
        await sendEmailVerification(currentUser);
        toast.info("Verification email sent.");
      }
    } catch {
      toast.error("Failed to send verification email.");
    }
  };

  return (
    <>
      <Tooltip title="Profile">
        <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
          <Avatar
            src={currentUser?.photoURL || undefined}
            alt={currentUser?.displayName || "User"}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: 260,
            mt: 1.5,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {currentUser ? (
          <>
            <Box px={2} py={1}>
              <Typography fontWeight="bold">{currentUser.displayName || "User"}</Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUser.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            {!currentUser.emailVerified ? (
              <MenuItem onClick={handleResendVerification}>
                <ListItemIcon>
                  <Email fontSize="small" sx={{ color: "#ff1744" }} />
                </ListItemIcon>
                Resend Verification Email
              </MenuItem>
            ) : (
              <MenuItem disabled>
                <ListItemIcon>
                  <CheckCircle fontSize="small" color="success" />
                </ListItemIcon>
                Email Verified
              </MenuItem>
            )}

            {isAdmin && (
              <MenuItem onClick={() => navigate("/admin")}>
                <ListItemIcon>
                  <AdminPanelSettings fontSize="small" sx={{ color: "#ff1744" }} />
                </ListItemIcon>
                Admin Panel
              </MenuItem>
            )}

            <MenuItem onClick={() => navigate("/privacy-policy")}>
              <ListItemIcon>
                <Policy fontSize="small" sx={{ color: "#ff1744" }} />
              </ListItemIcon>
              Privacy Policy
            </MenuItem>

            <MenuItem onClick={() => navigate("/help")}>
              <ListItemIcon>
                <HelpOutline fontSize="small" sx={{ color: "#ff1744" }} />
              </ListItemIcon>
              Help Center
            </MenuItem>

            <Divider sx={{ my: 1 }} />
          </>
        ) : (
          <MenuItem disabled>Loading user...</MenuItem>
        )}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "#ff1744" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
