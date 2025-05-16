import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../app/api/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Topbar from "../../components/Topbar";

const Signup: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          fullName: fullName.trim(),
          email: user.email,
          role: "user",
          createdAt: new Date(),
        });

        console.log("✅ Firestore user document created");

        await sendEmailVerification(user);
        toast.success("Verification email sent. Please check your inbox!");

        navigate("/login");
      }
    } catch (error: any) {
      console.error("🔥 Signup error:", error.message);
      toast.error("Signup failed: " + error.message);
    }
  };

  return (
    <>
      <Topbar />
      <Box
        sx={{
          mt: 12,
          mx: "auto",
          maxWidth: 400,
          px: 3,
          textAlign: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : "#fff",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#ff1744",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              fontWeight: 600,
              mb: 3,
              userSelect: "none",
            }}
          >
            <LockIcon sx={{ fontSize: "2rem" }} />
            Sign Up
          </Typography>

          <form onSubmit={handleSignup}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent",
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor:
                    theme.palette.mode === "dark" ? "#fff" : "#000",
                  transition: "background-color 5000s ease-in-out 0s",
                },
              }}
              required
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent",
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor:
                    theme.palette.mode === "dark" ? "#fff" : "#000",
                  transition: "background-color 5000s ease-in-out 0s",
                },
              }}
              required
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent",
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor:
                    theme.palette.mode === "dark" ? "#fff" : "#000",
                  transition: "background-color 5000s ease-in-out 0s",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#ff1744",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#d50000",
                },
              }}
            >
              🔐 SIGN UP
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{ mt: 2, color: "text.secondary", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Login →
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Signup;
