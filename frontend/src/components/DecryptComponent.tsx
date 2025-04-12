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
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LockOpenIcon from "@mui/icons-material/LockOpen";

// Use environment variable for backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const DecryptComponent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState<string>("");
  const theme = useTheme();

  // Callback function for handling file drops
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    toast.success(`${acceptedFiles.length} file(s) added successfully! 🎉`);
  }, []);

  // Dropzone hook for accepting encrypted files
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/octet-stream": [".enc"] },
    multiple: true,
  });

  // Handle decryption process
  const handleDecrypt = async () => {
    if (files.length === 0 || password === "") {
      toast.error("Please select files and enter a password.");
      return;
    }

    toast.info("Decrypting files... 🔓");

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);

      try {
        const response = await fetch("https://your-railway-app.up.railway.app/api/decrypt", {  // Fixed URL
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error(`Decryption failed for ${file.name}`);

        const blob = await response.blob();
        if (blob.size === 0) {
          toast.error(`Incorrect password for ${file.name}. ❌`);
          continue;
        }

        // Create a download link for the decrypted file
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `decrypted_${file.name.replace(".enc", "")}`;
        link.click();

        toast.success(`File ${file.name} decrypted successfully! ✅`);
      } catch (error) {
        toast.error(`Decryption failed for ${file.name}. ❌`);
      }
    }
  };

  return (
    <Box sx={{ mt: 10, mx: "auto", maxWidth: 700, px: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 600 }}
      >
        <LockOpenIcon sx={{ color: "#ff1744" }} />
        Decrypt Your Files
      </Typography>

      {/* Dropzone */}
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
            : "Drag & drop your encrypted files here, or click to select"}
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
        label="Decryption Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ my: 2 }}
      />

      {/* Decrypt Button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleDecrypt}
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
        🔓 DECRYPT FILES
      </Button>
    </Box>
  );
};

export default DecryptComponent;
