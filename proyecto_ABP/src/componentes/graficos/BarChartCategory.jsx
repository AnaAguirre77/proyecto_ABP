import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function BarChartCategory({ data }) {
  // para contar la cantidad de productos por categoria
  const productosPorCategoria = useMemo(() => {
    const counts = {};
    data.forEach((producto) => {
      const cat = producto.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [data]);

  const labels = Object.keys(productosPorCategoria);
  const counts = Object.values(productosPorCategoria);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Cantidad de productos",
        data: counts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Cantidad de productos por categoría",
        color: "#000000",
        font: { weight: "bold", size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
        ticks: { stepSize: 1 },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
