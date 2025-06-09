import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// registro los componentes del grafico
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function LineChartPriceEvolution() {
  // datos simulados, en este caso: 7 dias
  const labels = [
    "Día 1",
    "Día 2",
    "Día 3",
    "Día 4",
    "Día 5",
    "Día 6",
    "Día 7",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "precio promedio",
        data: [12, 15, 14, 18, 20, 17, 22],
        borderColor: "rgba(75, 192, 192, 0.6)",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Evolución de precios",
        color: "grey",
        font: { weight: "bold", size: 16 },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Line data={data} options={options} />;
}

export default LineChartPriceEvolution;
