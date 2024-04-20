import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OutgoingTransactionsChart = ({ data }) => {
  // Assuming 'data' is an array of objects with 'month' and 'value' properties
  const chartData = {
    labels: ['month a','month b'],
    datasets: [
      {
        label: 'Outgoing Transactions',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Outgoing Transactions Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default OutgoingTransactionsChart;