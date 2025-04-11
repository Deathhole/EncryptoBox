import React from "react";
import { Box, Typography } from "@mui/material";

const AdminPage = () => {
  return (
    <Box sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" sx={{ color: "#ff1744", fontWeight: "bold" }}>
        🔐 Admin Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
        Welcome, Admin! You have access to restricted tools and stats here.
      </Typography>
    </Box>
  );
};

export default AdminPage;
