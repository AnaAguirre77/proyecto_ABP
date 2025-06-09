import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// registro componentes de chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartStock({ products }) {
  // calculo la cantidad de productos con stock alto o bajo, threshold de 15!
  const stockThreshold = 15;

  const stockData = products.reduce(
    (acc, product) => {
      if (product.stock > stockThreshold) {
        acc.highStock += 1;
      } else {
        acc.lowStock += 1;
      }
      return acc;
    },
    { highStock: 0, lowStock: 0 }
  );

  const data = {
    labels: ["Stock > 15, alto", "Stock ≤ 15, bajo"],
    datasets: [
      {
        data: [stockData.highStock, stockData.lowStock],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "#ff964f"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="text-center mt-8">
      <h3 className="text-sm font-bold text-[#939191]">
        Distribución de productos según stock
        <br />
        <span className="text-sm font-normal">
          (menos de 15 unidades = stock bajo)
        </span>
      </h3>
      <br />
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChartStock;
