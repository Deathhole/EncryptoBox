import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import zxcvbn from "zxcvbn";

// Use your environment variable for the API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const EncryptComponent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const theme = useTheme();

  // Allowed file types for encryption
  const allowedFileTypes = [
    "image/png", "image/jpeg", "text/plain", "application/pdf",
    "application/zip", "application/json", "audio/mpeg", "audio/wav",
    "audio/ogg", "video/mp4", "video/quicktime", "video/x-matroska",
  ];

  // Handle file drops and validation
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file =>
      allowedFileTypes.includes(file.type)
    );
    const invalidFiles = acceptedFiles.filter(
      file => !allowedFileTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error(`Unsupported file types: ${invalidFiles.map(f => f.name).join(", ")}`);
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} valid file(s) added!`);

      // Auto delete files after 1 minute
      validFiles.forEach(file => {
        setTimeout(() => {
          setFiles(prev => prev.filter(f => f !== file));
          toast.info(`File ${file.name} auto-deleted after 1 minute.`);
        }, 60000);
      });
    }
  }, []);

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    multiple: true,
  });

  // Handle encryption process
  const handleEncrypt = async () => {
    if (files.length === 0 || password === "") {
      toast.error("Please select files and enter a password.");
      return;
    }

    setUploadProgress(0);
    toast.info("Encrypting files... 🔐");

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);

      try {
        const response = await fetch(`${API_BASE_URL}/api/encrypt`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error(`Encryption failed for ${file.name}`);

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `${file.name}.enc`;
        link.click();

        toast.success(`File ${file.name} encrypted successfully! ✅`);
      } catch (error) {
        toast.error(`Encryption failed for ${file.name}. ❌`);
      }

      setUploadProgress(prev => prev + 100 / files.length);
    }
  };

  // Password strength calculation
  const passwordStrength = zxcvbn(password).score;
  const strengthLabels = ["Weak", "Weak", "Okay", "Good", "Strong"];
  const strengthColors = ["#d32f2f", "#f57c00", "#fbc02d", "#388e3c", "#2e7d32"];

  return (
    <Box sx={{ mt: 10, mx: "auto", maxWidth: 700, px: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 600 }}
      >
        <LockIcon sx={{ color: "#ff1744" }} />
        Encrypt Your Files
      </Typography>

      {/* File Dropzone */}
      <Paper
        {...getRootProps()}
        elevation={3}
        sx={{
          border: `2px dashed ${theme.palette.mode === "dark" ? "#ff1744" : "#d32f2f"}`,
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          mb: 3,
          borderRadius: 2,
          backgroundColor: isDragActive
            ? theme.palette.action.hover
            : theme.palette.background.paper,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 40, color: "#ff1744", mb: 1 }} />
        <Typography variant="body1" color="text.secondary">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop files here, or click to select"}
        </Typography>
      </Paper>

      {/* File List */}
      {files.length > 0 && (
        <List dense>
          {files.map((file, idx) => (
            <ListItem key={idx} divider>
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      )}

      {/* Password Input */}
      <TextField
        fullWidth
        type="password"
        label="Encryption Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ my: 2 }}
      />

      {/* Password Strength Indicator */}
      {password && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(passwordStrength + 1) * 20}
            sx={{
              height: 8,
              borderRadius: 2,
              backgroundColor: "#eee",
              "& .MuiLinearProgress-bar": {
                backgroundColor: strengthColors[passwordStrength],
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: strengthColors[passwordStrength], mt: 0.5 }}
          >
            Strength: {strengthLabels[passwordStrength]}
          </Typography>
        </Box>
      )}

      {/* Encrypt Button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleEncrypt}
        sx={{
          fontWeight: "bold",
          backgroundColor: "#ff1744",
          color: "#fff",
          mt: 2,
          "&:hover": {
            backgroundColor: "#d50000",
          },
        }}
      >
        🔐 ENCRYPT FILES
      </Button>
    </Box>
  );
};

export default EncryptComponent;
