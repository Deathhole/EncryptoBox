import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

interface LogEntry {
  id: string;
  email: string;
  action: string;
  filename: string;
  timestamp: string; // Changed to string to handle the formatted date string
}

const AccessLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const logsRef = collection(db, "access_logs");
    const logsQuery = query(logsRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      logsQuery,
      (snapshot) => {
        const updatedLogs: LogEntry[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const timestamp = data.timestamp?.toDate().toLocaleString(); // Make sure it's a valid timestamp
          return {
            id: doc.id,
            email: data.email || "Unknown", // Handle undefined email
            action: data.action || "No Action", // Handle undefined action
            filename: data.filename || "No Filename", // Handle undefined filename
            timestamp: timestamp || "Unknown Time", // Handle undefined timestamp
          };
        });
        setLogs(updatedLogs);
        setError(null); // Reset error on successful fetch
      },
      (err) => {
        console.error("Error fetching logs:", err);
        setError("Failed to load logs. Please try again later.");
      }
    );

    return () => unsubscribe(); // 🔁 Cleanup listener on unmount
  }, []);

  return (
    <Paper elevation={4} sx={{ p: 3, bgcolor: "#1e1e1e", color: "#fff" }}>
      <Typography variant="h6" sx={{ display: "flex", alignItems: "center", fontWeight: "bold", color: "#ff5252" }}>
        <FolderIcon sx={{ mr: 1 }} />
        Access Logs
      </Typography>
      {error && (
        <Typography variant="body2" sx={{ color: "#ff5252", mt: 2 }}>
          {error}
        </Typography>
      )}
      <TableContainer sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>User Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
              <TableCell sx={{ color: "#fff" }}>Filename</TableCell>
              <TableCell sx={{ color: "#fff" }}>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell sx={{ color: "#ccc" }}>{log.email}</TableCell>
                <TableCell sx={{ color: "#ccc" }}>{log.action}</TableCell>
                <TableCell sx={{ color: "#ccc" }}>{log.filename}</TableCell>
                <TableCell sx={{ color: "#ccc" }}>{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AccessLogs;
