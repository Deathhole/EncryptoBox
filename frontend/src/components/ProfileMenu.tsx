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
  useTheme,
} from "@mui/material";
import {
  Logout,
  AdminPanelSettings,
  Email,
  CheckCircle,
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
    } catch (error: any) {
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

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        {currentUser ? (
          <>
            <Box px={2} py={1}>
              <Typography variant="subtitle1">
                {currentUser.displayName || "Anonymous User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUser.email}
              </Typography>
            </Box>

            <Divider />

            {!currentUser.emailVerified ? (
              <MenuItem onClick={handleResendVerification}>
                <Email fontSize="small" sx={{ mr: 1 }} /> Resend Verification Email
              </MenuItem>
            ) : (
              <MenuItem disabled>
                <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} /> Email Verified
              </MenuItem>
            )}

            {isAdmin && (
              <MenuItem onClick={() => navigate("/admin")}>
                <AdminPanelSettings fontSize="small" sx={{ mr: 1 }} /> Admin Panel
              </MenuItem>
            )}

            

            <Divider />
          </>
        ) : (
          <MenuItem disabled>Loading...</MenuItem>
        )}

        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
