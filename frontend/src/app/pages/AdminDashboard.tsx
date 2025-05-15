import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import UserTable from "../../components/Admin/UserTable";
import FileStats from "../../components/Admin/FileStats";
import AccessLogs from "../../components/Admin/AccessLogs";
import AnalyticsCharts from "../../components/Admin/AnalyticsCharts";

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" color="secondary" gutterBottom>
        🔐 Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <UserTable />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <FileStats />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <AccessLogs />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <AnalyticsCharts />
          </Paper>
        </Grid>

        
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
