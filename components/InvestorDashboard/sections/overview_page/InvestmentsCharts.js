"use client";

import { act, useState } from "react";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
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
import { set } from "react-hook-form";

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
  const InsightTabs = [
    {
      title: "1 week",
      id: 0,
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            fill: true,
            label: "Performance",
            data: [420, 610, 280, 500, 720, 460, 590, 540, 680, 430, 390, 520],
            borderColor: "rgb(37, 99, 235)",
            backgroundColor: "rgba(37, 99, 235, 0.12)",
            tension: 0.5,
          },
        ],
      },
    },
    {
      title: "6 month",
      id: 1,
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            fill: true,
            label: "Performance",
            data: [420, 610, 280, 500, 720, 460, 590, 540, 680, 430, 390, 520],
            borderColor: "rgb(37, 99, 235)",
            backgroundColor: "rgba(37, 99, 235, 0.12)",
            tension: 0.5,
          },
        ],
      },
    },
    {
      title: "1 year",
      id: 2,
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            fill: true,
            label: "Performance",
            data: [420, 610, 280, 500, 720, 460, 590, 540, 680, 430, 390, 520],
            borderColor: "rgb(37, 99, 235)",
            backgroundColor: "rgba(37, 99, 235, 0.12)",
            tension: 0.5,
          },
        ],
      },
    },
  ];

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 800,
        ticks: {
          stepSize: 200,
        },
      },
    },
  };

  const [lineChartData, setLineChartData] = useState(InsightTabs[0].data);

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
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const [activeInsightTab, setActiveInsightTab] = useState(0);
  const activeInsightTabControler = (id) => {
    setActiveInsightTab(id);
    setLineChartData(InsightTabs[id].data);
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row items-start md:gap-5 justify-between bg-greyBg">
        {/* Line Chart */}
        <div className="lg:w-[65%] w-full space-y-1">
          {/* header */}
          <div
            className="bg-backgroundSecondary flex flex-col md:flex-row justify-between gap-3
          md:items-center py-2 px-2 md:px-5 md:h-[55px] rounded-tl-md rounded-tr-md"
          >
            <h2 className="text-sm">Investment Performance Insights</h2>

            <div className="flex gap-3 justify-between md:justify-normal items-center bg-[#F0F2F5] p-1 rounded-md">
              {InsightTabs?.map((tab, index) => (
                <span
                  key={index}
                  className={`text-[10px] py-2 px-5 md:p-2 rounded-md transition-all duration-100 cursor-not-allowed
                     ${
                       activeInsightTab === tab.id
                         ? "bg-white text-label"
                         : "text-grey"
                     }`}
                  // onClick={() => activeInsightTabControler(tab.id)}
                >
                  {tab.title}
                </span>
              ))}
            </div>
          </div>

          {/* Graph */}
          <div className="h-[300px] md:h-[350px] p-5 bg-backgroundSecondary rounded-bl-md rounded-br-md w-full">
            <Line options={lineChartOptions} data={lineChartData} />
          </div>
        </div>

        {/* Doughtnut */}
        <div className="lg:w-[35%] w-full bg-greyBg space-y-1">
          {/* header */}
          <div className="bg-backgroundSecondary rounded-tl-md rounded-tr-md py-2 px-5 h-[55px] flex items-center">
            <h2 className="text-sm">Portfolio Breakdown</h2>
          </div>

          {/* Pie chart */}
          <div className="p-5 bg-backgroundSecondary rounded-bl-md rounded-br-md h-[350px] relative space-y-5">
            <div className="flex items-center justify-center relative h-[250px]">
              <Doughnut options={doughnutOptions} data={doughnutData} />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-3xl font-bold">
                  0.00 <span className="text-sm uppercase">usdt</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Invested Amount
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-10 md:gap-20 2xl:gap-20 lg:gap-10">
              {[
                { label: "IV 1", value: "$ 0", color: "#F2F2F2" },
                { label: "IV 2", value: "$ 0", color: "#F2F2F2" },
                { label: "IV 3", value: "$ 0", color: "#F2F2F2" },
              ].map((item) => (
                <div key={item.label} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}