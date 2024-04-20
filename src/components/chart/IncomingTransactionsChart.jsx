import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // Import Line instead of Bar
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
); // Register LineElement

const IncomingTransactionsChart = ({ data }) => {
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Incoming Transactions",
        data: data,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    layout: {
      padding: {
        top: 50, // Atur padding atas sesuai kebutuhan
        bottom: 50, // Atur padding bawah sesuai kebutuhan
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default IncomingTransactionsChart;
