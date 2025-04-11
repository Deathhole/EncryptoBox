import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Container, Paper, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../app/api/firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import mailAnimation from "../../assets/verify-email.json";


const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);

  // ⏳ Auto-polling every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          toast.success("✅ Email verified! Redirecting...");
          navigate("/home");
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleResend = async () => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
        toast.success("📧 Verification email sent!");
      } catch (error) {
        toast.error("⚠️ Failed to send email.");
        console.error("Resend error:", error);
      }
    } else {
      toast.info("✅ Already verified.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 10,
          p: 4,
          textAlign: "center",
          backgroundColor: "background.default",
          color: "text.primary",
          border: "1px solid #d32f2f",
        }}
      >
        <Box sx={{ width: 250, mx: "auto", mb: 2 }}>
          <Lottie animationData={mailAnimation} loop autoplay />
        </Box>

        <Typography variant="h5" gutterBottom>
          Verify Your Email
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          A verification email has been sent to your inbox. Please verify your email to continue.
        </Typography>

        <Button
          variant="contained"
          onClick={handleResend}
          sx={{
            mb: 2,
            backgroundColor: "#d32f2f",
            "&:hover": { backgroundColor: "#9a0007" },
          }}
        >
          Resend Verification Email
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Checking verification status...
        </Typography>
        <CircularProgress size={24} sx={{ mt: 1, color: "#d32f2f" }} />
      </Paper>
    </Container>
  );
};

export default VerifyEmail;
