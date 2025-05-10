import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/api/firebaseConfig";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully! 🚀");
      navigate("/home");
    } catch (err: any) {
      console.error(err);
      toast.error("Login failed. ❌");
    }
  };

  return (
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
          type="password"
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
  );
};

export default Login;
