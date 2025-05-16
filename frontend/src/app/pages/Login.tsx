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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../app/api/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer"; // ✅ Import Footer

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const checkOrCreateUserDoc = async (userId: string) => {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      try {
        await setDoc(userDocRef, {
          userId,
          createdAt: new Date(),
        });
        console.log("User document created successfully!");
      } catch (error) {
        console.error("Error creating user document: ", error);
      }
    } else {
      console.log("User document already exists");
    }
  };

  const handleLogin = async () => {
    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();

    if (!emailTrimmed || !passwordTrimmed) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailTrimmed, passwordTrimmed);
      const userId = userCredential.user.uid;

      await checkOrCreateUserDoc(userId);

      toast.success("Logged in successfully! 🚀");
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed. Please sign up first.");
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
          minHeight: "80vh", // ensures footer appears at bottom
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
            Login
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px transparent inset",
                WebkitTextFillColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                transition: "background-color 5000s ease-in-out 0s",
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px transparent inset",
                WebkitTextFillColor: theme.palette.mode === "dark" ? "#fff" : "#000",
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
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: "#ff1744",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#d50000",
              },
            }}
          >
            🔐 LOGIN
          </Button>

          <Typography
            variant="body2"
            sx={{ mt: 2, color: "text.secondary", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Don&apos;t have an account? Sign up →
          </Typography>
        </Paper>
      </Box>
      <Footer /> {/* ✅ Linked Footer here */}
    </>
  );
};

export default Login;
