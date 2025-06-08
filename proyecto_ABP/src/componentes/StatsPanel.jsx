function StatsPanel(props) {
  return (
    <div className="bg-[#fafafa] mt-8 p-4 rounded-lg shadow-md transition duration-300 ease-in-out text-justify">
      <h2 className="text-2xl font-semibold text-[#000000] mb-4">
        Estadísticas 📊
      </h2>
      <li className="mb-1 text-[#000000]">
        El producto más caro: {props.maxTitulo}, ${props.max}
      </li>
      <li className="mb-1 text-[#000000]">
        El producto más barato: {props.minTitulo}, ${props.min}
      </li>
      <li className="mb-1 text-[#000000]">
        El precio total de todos los productos: ${props.precioTotal}
      </li>
      <li className="mb-1 text-[#000000]">
        Precio promedio: ${props.precioPromedio}
      </li>
      <li className="mb-1 text-[#000000]">
        Productos con stock mayor a 50: {props.stockMayor50}
      </li>
      <li className="mb-1 text-[#000000]">
        Productos con rating mayor a 4.5: {props.ratingMayor45}
      </li>

      <li className="mb-1 text-[#000000]]">
        Promedio general de rating: {props.promedioRatingGeneral}
      </li>

      <br></br>
      <div>
        <h3 className="font-bold text-[#000000] mb-2">Por Categoria:</h3>
        <p className="font-semibold text-[#000000] mb-2">
          Cantidad de productos por categoria:
        </p>
        <ul className="list-disc list-inside text-[#000000]">
          {Object.entries(props.productosPorCategoria).map(
            ([categoria, cantidad]) => (
              <li key={categoria}>
                {categoria}: {cantidad}
              </li>
            )
          )}
        </ul>
        <br></br>
        <p className="font-semibold text-[#000000] mb-2">
          Precio promedio por categoria:
        </p>
        <ul className="list-disc list-inside text-[#000000]">
          {Object.entries(props.precioPromedioPorCategoria).map(
            ([categoria, promedio]) => (
              <li key={categoria}>
                {categoria}: ${promedio}
              </li>
            )
          )}
        </ul>
        <br></br>
        <p className="font-semibold text-[#000000] mb-2">
          Rating promedio por categoria:
        </p>
        <ul className="list-disc list-inside text-[#000000]">
          {Object.entries(props.promedioRatingPorCategoria).map(
            ([categoria, rating]) => (
              <li key={categoria}>
                {categoria}: {rating}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default StatsPanel;
