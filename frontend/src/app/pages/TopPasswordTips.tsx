import React from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

const passwordTips = [
  "Use a mix of uppercase, lowercase, numbers, and symbols.",
  "Avoid using personal information like your name or birthday.",
  "Use a passphrase or random words instead of single words.",
  "Enable two-factor authentication wherever possible.",
  "Never reuse passwords across different sites.",
  "Change your passwords periodically.",
  "Use a trusted password manager to generate and store secure passwords.",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const TopPasswordTips: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        maxWidth: "1000px",
        mx: "auto",
        color: "#f1f5f9",
        backgroundColor: "#111827", // background
        borderRadius: "12px",
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={5}>
        <ShieldOutlinedIcon sx={{ fontSize: 48, color: "#38bdf8" }} />
        <Typography
          variant={isMobile ? "h4" : "h3"}
          fontWeight={700}
          sx={{
            background: "linear-gradient(to right, #14b8a6, #38bdf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mt: 1,
          }}
        >
          Top Password Tips
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#94a3b8",
            maxWidth: 700,
            mx: "auto",
            mt: 2,
            fontSize: "1rem",
          }}
        >
          Strengthen your security with these password best practices.
        </Typography>
      </Box>

      {/* Tips */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "24px",
        }}
      >
        {passwordTips.map((tip, index) => (
          <motion.div key={index} variants={item}>
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 28px rgba(56, 189, 248, 0.25)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ color: "#38bdf8", mb: 1 }}
                >
                  Tip {index + 1}
                </Typography>
                <Typography variant="body1" sx={{ color: "#e2e8f0" }}>
                  {tip}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
};

export default TopPasswordTips;
