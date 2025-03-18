import React from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';

// Function to convert dataset into chart data
const extractBarChartData = (data) => {
  // Extract labels and data from the input data
  const labels = data.map(item => item.firstUserPrimaryChannelGroup);
  const newUsersData = data.map(item => Number(item.newUsers));

  return {
    labels: labels,
    datasets: [
      {
        label: 'Novos Utilizadores',
        data: newUsersData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
};

const FUPCGBarChart = ({ data }) => {
  // Prepare chart data using the function above
  const chartData = extractBarChartData(data);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Novos Utilizadores por Canal',
      },
    },
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Novos Utilizadores'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Canal'
        },
        ticks: {
          autoSkip: false,
        },
      },
    },
  };

  return <HorizontalBar data={chartData} options={options} />;
};

export default FUPCGBarChart;
