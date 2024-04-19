import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const OutgoingTransactionsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/in`
      );
      const data = response.data;
      const monthlyCounts = countTransactionsByMonth(data);
      setChartData({
        labels: monthlyCounts.map((item) => item.month),
        datasets: [
          {
            label: "Number of Outgoing Transactions",
            data: monthlyCounts.map((item) => item.count),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const countTransactionsByMonth = (data) => {
    const counts = Array(12).fill(0);
    data.forEach((item) => {
      const month = new Date(item.date).getMonth();
      counts[month]++;
    });
    return counts.map((count, index) => ({ month: index + 1, count: count }));
  };

  return (
    <div>
      <h2>Outgoing Transactions Per Month</h2>
      {loading ? (
        <p>Loading...</p>
      ) : chartData ? (
        <div style={{ height: "400px", width: "600px" }}>
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default OutgoingTransactionsChart;
