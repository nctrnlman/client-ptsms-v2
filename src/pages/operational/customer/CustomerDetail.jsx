import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TransactionChart = () => {
  const [transactionOutData, setTransactionOutData] = useState({});
  const [transactionInData, setTransactionInData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const outResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/transactions/out/chart`);
        const inResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/transactions/in/chart`);

        const outData = outResponse.data;
        const inData = inResponse.data;

        const transactionOutData = {
          labels: outData.labels, // Misalnya, array bulan atau tahun
          datasets: [
            {
              label: 'Transaksi Keluar',
              data: outData.values, // Misalnya, array total transaksi keluar per bulan atau per tahun
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        };

        const transactionInData = {
          labels: inData.labels, // Misalnya, array bulan atau tahun
          datasets: [
            {
              label: 'Transaksi Masuk',
              data: inData.values, // Misalnya, array total transaksi masuk per bulan atau per tahun
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };

        setTransactionOutData(transactionOutData);
        setTransactionInData(transactionInData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Transaksi Keluar</h2>
      <Line data={transactionOutData} />
      <h2>Transaksi Masuk</h2>
      <Line data={transactionInData} />
    </div>
  );
};

export default TransactionChart;