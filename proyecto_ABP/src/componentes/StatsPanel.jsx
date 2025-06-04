function StatsPanel(props) {
  return (
    <div className="bg-[#EAF8FE] mt-8 p-4 rounded-lg shadow-md border border-blue-200 transition duration-300 ease-in-out text-justify">
      <h2 className="text-2xl font-semibold text-[#5B9BD5] mb-4">
        Estadísticas 📊
      </h2>
      <p className="mb-1 ">
        El producto más caro: {props.maxTitulo}, ${props.max}
      </p>
      <p className="mb-1">
        El producto más barato: {props.minTitulo}, ${props.min}
      </p>
      <p className="mb-1">
        El precio total de todos los productos: ${props.precioTotal}
      </p>
    </div>
  );
}

export default StatsPanel;
