"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function ReferralEarningsChart({ data }) {
  const [chartData, setChartData] = useState(null);
  const [period, setPeriod] = useState("30d");

  const fetchData = async () => {
    const res = await axios.get(
      `/api/dashboard/referrals/earnings-chart?period=${period}`,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );

    const labels = res.data.data.map((d) => d.date);
    const values = res.data.data.map((d) => d.amount);

    setChartData({
      labels,
      datasets: [
        {
          label: "Referral Earnings",
          data: values,
          fill: true,
          borderColor: "#2563EB",
          backgroundColor: "rgba(37, 99, 235, 0.12)",
          tension: 0.4,
        },
      ],
    });
  };

  useEffect(() => {
    fetchData();
  }, [period]);

  if (!chartData) return null;

  return (
    <div className="bg-backgroundPrimary rounded-xl p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Referral Earnings</h3>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="h-[280px]">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false } },
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
    </div>
  );
}