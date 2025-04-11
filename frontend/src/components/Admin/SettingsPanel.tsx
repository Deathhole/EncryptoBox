import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  Button
} from "@mui/material";

const SettingsPanel = () => {
  const [fileExpiry, setFileExpiry] = useState("1 hour");
  const [maxSize, setMaxSize] = useState(5); // MB
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [decryptionEnabled, setDecryptionEnabled] = useState(true);
  const [broadcastMsg, setBroadcastMsg] = useState("");

  const handleSave = () => {
    console.log("🔧 Saving settings:", {
      fileExpiry,
      maxSize,
      encryptionEnabled,
      decryptionEnabled,
      broadcastMsg
    });

    // TODO: Save these to Firestore or your backend
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Application Settings
      </Typography>

      <Box display="flex" flexDirection="column" gap={3} mt={2}>
        {/* File Expiry */}
        <FormControl fullWidth>
          <InputLabel>File Expiry Time</InputLabel>
          <Select
            value={fileExpiry}
            label="File Expiry Time"
            onChange={(e) => setFileExpiry(e.target.value)}
          >
            <MenuItem value="15 minutes">15 minutes</MenuItem>
            <MenuItem value="1 hour">1 hour</MenuItem>
            <MenuItem value="6 hours">6 hours</MenuItem>
            <MenuItem value="1 day">1 day</MenuItem>
          </Select>
        </FormControl>

        {/* Max File Size */}
        <TextField
          label="Max File Size (MB)"
          type="number"
          value={maxSize}
          onChange={(e) => setMaxSize(parseInt(e.target.value))}
          fullWidth
        />

        {/* Toggle encryption/decryption */}
        <FormControlLabel
          control={
            <Switch
              checked={encryptionEnabled}
              onChange={(e) => setEncryptionEnabled(e.target.checked)}
            />
          }
          label="Enable Encryption"
        />

        <FormControlLabel
          control={
            <Switch
              checked={decryptionEnabled}
              onChange={(e) => setDecryptionEnabled(e.target.checked)}
            />
          }
          label="Enable Decryption"
        />

        {/* Broadcast message */}
        <TextField
          label="Broadcast Message"
          value={broadcastMsg}
          onChange={(e) => setBroadcastMsg(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />

        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Settings
        </Button>
      </Box>
    </Paper>
  );
};

export default SettingsPanel;
