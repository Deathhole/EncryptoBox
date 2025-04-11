import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Paper, Typography } from "@mui/material";

interface DayData {
  day: string;
  encryptions: number;
  decryptions: number;
}

const AnalyticsCharts: React.FC = () => {
  const [chartData, setChartData] = useState<DayData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "analytics_summary"), (snapshot) => {
      const newData: DayData[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        newData.push({
          day: doc.id,
          encryptions: data.encryptions || 0,
          decryptions: data.decryptions || 0,
        });
      });

      // Optional: sort by weekday order
      const weekdayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      newData.sort((a, b) => weekdayOrder.indexOf(a.day) - weekdayOrder.indexOf(b.day));

      setChartData(newData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Paper sx={{ p: 3, bgcolor: "#1e1e1e", color: "#fff", mt: 4 }}>
      <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>Weekly Activity Overview</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="encryptions" stroke="#ff4d4d" strokeWidth={2} />
          <Line type="monotone" dataKey="decryptions" stroke="#3399ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      <Typography variant="h6" sx={{ color: "#fff", mt: 5, mb: 2 }}>File Upload Stats</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="encryptions" fill="#ff4d4d" />
          <Bar dataKey="decryptions" fill="#3399ff" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default AnalyticsCharts;
