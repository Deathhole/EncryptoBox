import React from "react";
import { Box, Typography, Link as MuiLink, Divider } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link as RouterLink } from "react-router-dom";
import EncryptoBoxLogo from "./EncryptoBoxLogo"; // Adjust path if needed

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#121212",
        color: "#ccc",
        mt: 12,
        py: 8,
        px: { xs: 4, md: 12 },
        fontFamily: "'Roboto', sans-serif",
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: { xs: 6, md: 4 },
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* Logo & Description */}
        <Box sx={{ flex: 1, maxWidth: 320 }}>
          <Box display="flex" alignItems="center" mb={2} gap={1}>
            <EncryptoBoxLogo size={36} />
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: "#ff1744", letterSpacing: 1 }}
            >
              EncryptoBox
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#aaa" }}>
            Simple, secure encryption and decryption for your files. Your
            privacy and safety are our top priorities.
          </Typography>
        </Box>

        {/* Company Links */}
        <Box sx={{ flex: 1, maxWidth: 200 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#ff1744", letterSpacing: 1 }}
          >
            COMPANY
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <MuiLink
              component={RouterLink}
              to="/home"
              underline="none"
              sx={{
                color: "#ccc",
                fontSize: 14,
                transition: "color 0.25s ease",
                "&:hover": { color: "#ff1744" },
              }}
            >
              Home
            </MuiLink>

            <MuiLink
              component={RouterLink}
              to="/about"
              underline="none"
              sx={{
                color: "#ccc",
                fontSize: 14,
                transition: "color 0.25s ease",
                "&:hover": { color: "#ff1744" },
              }}
            >
              About Us
            </MuiLink>

            <MuiLink
              component={RouterLink}
              to="/privacy-policy"
              underline="none"
              sx={{
                color: "#ccc",
                fontSize: 14,
                transition: "color 0.25s ease",
                "&:hover": { color: "#ff1744" },
              }}
            >
              Privacy Policy
            </MuiLink>
          </Box>
        </Box>

        {/* Contact Info */}
        <Box sx={{ flex: 1, maxWidth: 280 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#ff1744", letterSpacing: 1 }}
          >
            GET IN TOUCH
          </Typography>
          <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
            <PhoneIcon fontSize="small" sx={{ color: "#ff1744" }} />
            <MuiLink
              href="tel:+0000000000"
              underline="none"
              sx={{ color: "#ccc", fontSize: 14, "&:hover": { color: "#ff1744" } }}
            >
              +0-000-000-000
            </MuiLink>
          </Box>
          <Box display="flex" alignItems="center" gap={1.5}>
            <EmailIcon fontSize="small" sx={{ color: "#ff1744" }} />
            <MuiLink
              href="mailto:encryptobox@gmail.com"
              underline="none"
              sx={{ color: "#ccc", fontSize: 14, "&:hover": { color: "#ff1744" } }}
            >
              encryptobox@gmail.com
            </MuiLink>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#333", my: 6, maxWidth: 1200, mx: "auto" }} />

      {/* Footer Bottom */}
      <Box textAlign="center" maxWidth={1200} mx="auto">
        <Typography variant="caption" sx={{ color: "#666" }}>
          © {new Date().getFullYear()} EncryptoBox — All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
