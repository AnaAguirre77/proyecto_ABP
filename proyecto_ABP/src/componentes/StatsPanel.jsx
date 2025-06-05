function StatsPanel(props) {
  return (
    <div className="bg-[#fafafa] mt-8 p-4 rounded-lg shadow-md transition duration-300 ease-in-out text-justify">
      <h2 className="text-2xl font-semibold text-[#5B9BD5] mb-4">
        Estadísticas 📊
      </h2>
      <p className="mb-1 text-[#5B9BD5]">
        - El producto más caro: {props.maxTitulo}, ${props.max}
      </p>
      <p className="mb-1 text-[#5B9BD5]">
        - El producto más barato: {props.minTitulo}, ${props.min}
      </p>
      <p className="mb-1 text-[#5B9BD5]">
        - El precio total de todos los productos: ${props.precioTotal}
      </p>
      <p className="mb-1 text-[#5B9BD5]">
        - Precio promedio: ${props.precioPromedio}
      </p>
      <p className="mb-1 text-[#5B9BD5]">
        - Productos con stock mayor a 50: {props.stockMayor50}
      </p>
      <p className="mb-1 text-[#5B9BD5]">
        - Productos con rating mayor a 4.5: {props.ratingMayor45}
      </p>

      <p className="text-[#5B9BD5]">
        - Promedio general de rating: {props.promedioRatingGeneral}
      </p>

      <br></br>
      <div>
        <h3 className="font-semibold text-[#5B9BD5] mb-2">Por Categoria:</h3>
        <p className="font-semibold text-[#5B9BD5] mb-2">
          Cantidad de productos por categoria:
        </p>
        <ul className="list-disc list-inside text-[#5B9BD5]">
          {Object.entries(props.productosPorCategoria).map(
            ([categoria, cantidad]) => (
              <li key={categoria}>
                {categoria}: {cantidad}
              </li>
            )
          )}
        </ul>
        <br></br>
        <p className="font-semibold text-[#5B9BD5] mb-2">
          Precio promedio por categoria:
        </p>
        <ul className="list-disc list-inside text-[#5B9BD5]">
          {Object.entries(props.precioPromedioPorCategoria).map(
            ([categoria, promedio]) => (
              <li key={categoria}>
                {categoria}: ${promedio}
              </li>
            )
          )}
        </ul>
        <br></br>
        <p className="mt-2 font-medium text-[#5B9BD5]">
          Rating promedio por categoría:
        </p>
        <ul className="list-disc list-inside text-[#5B9BD5]">
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
