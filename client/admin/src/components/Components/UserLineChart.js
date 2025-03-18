import React from 'react';
import { Line } from 'react-chartjs-2';

// Function to convert dataset into chart data
const extractChartData = (data, tab) => {
  // Helper function to create a date object
  const createDate = (item) => {
    return new Date(`${item.month}-${item.day || 1}-2024`);
  }

  // Sort data by date
  const sortedData = data.slice().sort((a, b) => createDate(a) - createDate(b));

  // Create labels and datasets from sorted data
  const labels = sortedData.map(item => {
    const date = createDate(item);
    if (tab === 1) {
      // For daily view
      return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long' });
    } else if (tab === 2) {
      // For monthly view
      return date.toLocaleDateString('pt-PT', { month: 'long' }); 
    }
  });

  return {
    labels: labels,
    datasets: [
      {
        label: 'Utilizadores',
        data: sortedData.map(item => Number(item.activeUsers)),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Novos utilizadores',
        data: sortedData.map(item => Number(item.newUsers)),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };
};


const UserLineChart = ({ data, tab }) => {
  // Prepare chart data using the function above
  const chartData = extractChartData(data, tab);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Active Users & New Users over Time',
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function(value, index, values) {
            // Show month names on the x-axis
            const uniqueMonths = [...new Set(chartData.labels.map(label => label.split(' ')[1]))];
            return uniqueMonths.includes(chartData.labels[index].split(' ')[1]) ? chartData.labels[index] : '';
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default UserLineChart;
