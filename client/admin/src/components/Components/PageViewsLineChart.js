import React from 'react';
import { Line } from 'react-chartjs-2';

// Function to convert dataset into chart data
const extractChartData = (data) => {
  // Helper function to create a date object
  const createDate = (item) => {
    // Extract year, month, and day from the date string
    const year = item.date.slice(0, 4);
    const month = item.date.slice(4, 6); // Month is zero-indexed in JS Date, so subtract 1
    const day = item.date.slice(6, 8);
  
    // Return a new Date object
    return new Date(year, month - 1, day);
  };
  

  // Sort data by date
  const sortedData = data.slice().sort((a, b) => createDate(a) - createDate(b));

  // Create labels and datasets from sorted data
  const labels = sortedData.map(item => {
    const date = createDate(item);
    return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long' });
  });

  return {
    labels: labels,
    datasets: [
      {
        label: 'Visualizações de Página',
        data: sortedData.map(item => Number(item.screenPageViews)),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };
};


const PageViewsLineChart = ({ data }) => {
  // Prepare chart data using the function above
  const chartData = extractChartData(data);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Visualizações de Página ao Longo do Tempo',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Visualizações de Página',
        },
      },
    },
  };

  return <Line data={chartData} options={options} height={500}/>;
};

export default PageViewsLineChart;