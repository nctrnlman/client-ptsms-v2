import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OutgoingTransactionsChart = ({ data }) => {
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
        label: "Outgoing Transactions",
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
    // layout: {
    //   padding: {
    //     top: 50, // Atur padding atas sesuai kebutuhan
    //     bottom: 50, // Atur padding bawah sesuai kebutuhan
    //   },
    // },
    responsive: true,
    // maintainAspectRatio: false,
  };

  return (
    <div className="w-[50%]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default OutgoingTransactionsChart;
