"use client";

import { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

export default function InvestmentCharts() {
  // -----------------------------
  // DUMMY DATA (STABLE BASE)
  // -----------------------------
  const InsightTabs = [
    {
      title: "1 week",
      id: 0,
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            fill: true,
            label: "Performance",
            data: [420, 460, 440, 480, 520, 500, 540],
            borderColor: "rgb(20, 184, 166)",
            backgroundColor: "rgba(20, 184, 166, 0.12)",
            tension: 0.45,
          },
        ],
      },
    },
    {
      title: "6 month",
      id: 1,
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            fill: true,
            label: "Performance",
            data: [380, 420, 460, 510, 480, 560],
            borderColor: "rgb(20, 184, 166)",
            backgroundColor: "rgba(20, 184, 166, 0.12)",
            tension: 0.45,
          },
        ],
      },
    },
    {
      title: "1 year",
      id: 2,
      data: {
        labels: [
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"
        ],
        datasets: [
          {
            fill: true,
            label: "Performance",
            data: [300, 340, 360, 390, 420, 450, 480, 520, 500, 540, 560, 600],
            borderColor: "rgb(20, 184, 166)",
            backgroundColor: "rgba(20, 184, 166, 0.12)",
            tension: 0.45,
          },
        ],
      },
    },
  ];

  // -----------------------------
  // STATE
  // -----------------------------
  const [lineChartData, setLineChartData] = useState(InsightTabs[0].data);
  const [activeInsightTab, setActiveInsightTab] = useState(0);

  // This drives the ocean-like motion
  const [waveTick, setWaveTick] = useState(0);

  // -----------------------------
  // SAFE ANIMATION DRIVER
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveTick((t) => t + 1);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // -----------------------------
  // DERIVED (ANIMATED) CHART DATA
  // -----------------------------
  const animatedChartData = {
    ...lineChartData,
    datasets: [
      {
        ...lineChartData.datasets[0],
        data: lineChartData.datasets[0].data.map((value, index) => {
          const wave = Math.sin((waveTick + index) / 6) * 12;
          const noise = Math.random() * 1.5 - 0.75;
          const drift = Math.sin(waveTick / 40) * 2;

          return Math.max(100, Math.min(800, value + wave + noise + drift));
        }),
      },
    ],
  };

  // -----------------------------
  // CHART OPTIONS
  // -----------------------------
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        min: 0,
        max: 800,
        ticks: { stepSize: 200 },
      },
    },
  };

  // -----------------------------
  // TAB HANDLER
  // -----------------------------
  const activeInsightTabControler = (id: number) => {
    setActiveInsightTab(id);
    setLineChartData(InsightTabs[id].data);
  };

  // -----------------------------
  // DOUGHNUT (DUMMY)
  // -----------------------------
  const doughnutData = {
    labels: ["IV 1", "IV 2", "IV 3"],
    datasets: [
      {
        data: [2818, 1358, 550],
        backgroundColor: ["#F2F2F2", "#F2F2F2", "#F2F2F2"],
        borderWidth: 0,
        spacing: 5,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    cutout: "75%",
    plugins: { legend: { display: false } },
  };

  // -----------------------------
  // JSX
  // -----------------------------
  return (
    <div className="mx-auto space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row justify-between bg-greyBg">
        {/* LINE CHART */}
        <div className="lg:w-[65%] w-full space-y-1">
          <div className="bg-white flex justify-between items-center py-2 px-5 h-[55px] rounded-t-md">
            <h2 className="text-sm">Investment Performance Insights</h2>

            <div className="flex gap-2 bg-[#F0F2F5] p-1 rounded-md">
              {InsightTabs.map((tab) => (
                <span
                  key={tab.id}
                  className={`text-[10px] px-4 py-2 rounded-md cursor-pointer transition
                    ${
                      activeInsightTab === tab.id
                        ? "bg-white text-black"
                        : "text-grey"
                    }`}
                  onClick={() => activeInsightTabControler(tab.id)}
                >
                  {tab.title}
                </span>
              ))}
            </div>
          </div>

          <div className="h-[350px] p-5 bg-white rounded-b-md">
            <Line options={lineChartOptions} data={animatedChartData} />
          </div>
        </div>

        {/* DOUGHNUT */}
        <div className="lg:w-[35%] w-full space-y-1">
          <div className="bg-white py-2 px-5 h-[55px] flex items-center rounded-t-md">
            <h2 className="text-sm">Portfolio Breakdown</h2>
          </div>

          <div className="p-5 bg-white rounded-b-md h-[350px] relative">
            <div className="flex items-center justify-center h-[250px] relative">
              <Doughnut options={doughnutOptions} data={doughnutData} />
              <div className="absolute text-center">
                <div className="text-3xl font-bold">
                  0.00 <span className="text-sm">USDT</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Invested Amount
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
