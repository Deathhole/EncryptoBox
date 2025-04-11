// src/app/pages/admin/FileStats.tsx
import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';




const FileStats = () => {
  const [encryptedCount, setEncryptedCount] = useState(0);
  const [decryptedCount, setDecryptedCount] = useState(0);

  useEffect(() => {
    const fetchFileCounts = async () => {
      try {
        const encryptedSnapshot = await getDocs(collection(db, "encryptedFiles"));
        const decryptedSnapshot = await getDocs(collection(db, "decryptedFiles"));

        setEncryptedCount(encryptedSnapshot.size);
        setDecryptedCount(decryptedSnapshot.size);
      } catch (error) {
        console.error("Failed to fetch file stats:", error);
      }
    };

    fetchFileCounts();
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
        📊 File Statistics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1">🔐 Total Encrypted Files</Typography>
            <Typography variant="h6">{encryptedCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1">📥 Total Decrypted Files</Typography>
            <Typography variant="h6">{decryptedCount}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FileStats;
