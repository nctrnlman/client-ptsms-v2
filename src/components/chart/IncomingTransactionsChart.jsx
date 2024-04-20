import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Import Line instead of Bar
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend); // Register LineElement

const IncomingTransactionsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Incoming Transactions',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Optional for line charts
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/transactions/in/list`);
        const transactionData = response.data.data.reduce((acc, item) => {
          const existingIndex = acc.findIndex((entry) => entry.label === `${item.supplier_name} - (${item.supplier_code})`);
          if (existingIndex === -1) {
            acc.push({ label: `${item.supplier_name} - (${item.supplier_code})`, data: 1 });
          } else {
            acc[existingIndex].data += 1;
          }
          return acc;
        }, []);
        setChartData({
          labels: transactionData.map((item) => item.label),
          datasets: [
            {
              label: 'Total Incoming Transactions',
              data: transactionData.map((item) => item.data),
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Optional for line charts
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
            },
            y: {
              type: 'linear',
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default IncomingTransactionsChart;