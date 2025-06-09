import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductList from "./componentes/ProductList";
import StatsPanel from "./componentes/StatsPanel";
import SearchBar from "./componentes/SearchBar";
import BarChartCategory from "./componentes/graficos/BarChartCategory";
import LineChartPriceEvolution from "./componentes/graficos/LineChartPriceEvolution";
import PieChartStock from "./componentes/graficos/PieChartStock";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [format, setFormat] = useState("");
  const [page, setPage] = useState(1);

  // referencias
  const containerRef = useRef(null);
  const limit = 30;

  // conexion con la API, para obtener productos
  useEffect(() => {
    axios
      .get(
        `https://dummyjson.com/products?limit=${limit}&skip=${
          (page - 1) * limit
        }`
      )
      .then((res) => {
        setProducts(res.data.products);
      });
  }, [page]);

  // trabajando con categorias

  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories").then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
  }, []);

  const filteredProducts = products.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "" || p.category === selectedCategory)
    );
  });

  // para el ordenamiento, asc y desc

  let sortedProducts = [...filteredProducts];
  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating-asc") {
    sortedProducts.sort((a, b) => a.rating - b.rating);
  } else if (sortBy === "rating-desc") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  const max = Math.max(...filteredProducts.map((p) => p.price));
  const min = Math.min(...filteredProducts.map((p) => p.price));

  const maxTitulo = filteredProducts.find((p) => p.price === max)?.title || "";
  const minTitulo = filteredProducts.find((p) => p.price === min)?.title || "";

  const precioTotal = filteredProducts.reduce((acc, p) => acc + p.price, 0);

  // para sumar nuevas estadisticas

  const precioPromedio =
    filteredProducts.length > 0
      ? (precioTotal / filteredProducts.length).toFixed(2)
      : 0;

  const StockMayor50 = filteredProducts.filter((p) => p.stock > 50).length;
  const RatingMayor4_5 = filteredProducts.filter((p) => p.rating > 4.5).length;

  const productosPorCategoria = filteredProducts.reduce((acc, producto) => {
    acc[producto.category] = (acc[producto.category] || 0) + 1;
    return acc;
  }, {});

  const promedioPorCategoria = filteredProducts.reduce((acc, producto) => {
    if (!acc[producto.category]) {
      acc[producto.category] = { suma: 0, cantidad: 0 };
    }
    acc[producto.category].suma += producto.price;
    acc[producto.category].cantidad += 1;
    return acc;
  }, {});

  const precioPromedioPorCategoria = {};
  for (const categoria in promedioPorCategoria) {
    const { suma, cantidad } = promedioPorCategoria[categoria];
    precioPromedioPorCategoria[categoria] = (suma / cantidad).toFixed(2);
  }

  const promedioRatingGeneral =
    filteredProducts.length > 0
      ? (
          filteredProducts.reduce((acc, p) => acc + p.rating, 0) /
          filteredProducts.length
        ).toFixed(2)
      : 0;

  const ratingPorCategoria = {};
  filteredProducts.forEach((producto) => {
    const cat = producto.category;
    if (!ratingPorCategoria[cat]) {
      ratingPorCategoria[cat] = { suma: 0, cantidad: 0 };
    }
    ratingPorCategoria[cat].suma += producto.rating;
    ratingPorCategoria[cat].cantidad += 1;
  });

  const promedioRatingPorCategoria = {};
  for (const categoria in ratingPorCategoria) {
    const { suma, cantidad } = ratingPorCategoria[categoria];
    promedioRatingPorCategoria[categoria] = (suma / cantidad).toFixed(2);
  }

  // trabajando con dark mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
  };

  const handleExport = () => {
    let blob, url, filename;

    if (format === "json") {
      blob = new Blob([JSON.stringify(filteredProducts, null, 2)], {
        type: "application/json",
      });
      filename = "productos.json";
    } else if (format === "csv" || format === "excel") {
      const headers = Object.keys(filteredProducts[0] || {}).join(",");
      const rows = filteredProducts.map((p) =>
        Object.values(p)
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      );
      const csv = [headers, ...rows].join("\n");
      blob = new Blob([csv], { type: "text/csv" });
      filename = format === "csv" ? "productos.csv" : "productos.xls";
    } else {
      alert("Por favor selecciona un formato válido.");
      return;
    }

    url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
  };

  const triggerDownload = (url, filename) => {
    //para crear un hipervinculo
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      ref={containerRef}
      className={`app ${
        darkMode ? "dark-mode" : ""
      } max-w-6xl mx-auto mt-6 p-4 sm:p-8 rounded-2xl shadow-lg transition-all`}
    >
      <button
        onClick={toggleDarkMode}
        className="mt-4 px-4 py-2 w-full sm:w-auto text-black border rounded hover:bg-[#EAF8FE] transition"
      >
        modo {darkMode ? "claro 𖤓" : "oscuro ☾"}
      </button>
      <div className="min-h-screen py-8 px-4">
        <div className="relative mb-6 rounded-lg overflow-hidden h-40 sm:h-56">
          <img
            src="https://www.pixelbyhand.com/wp-content/uploads/2023/11/A-collage-of-various-e-commerce-products-represented-in-different-photography-styles_-lifestyle-minimalism-interactive-environmental-and-monochrom.png"
            alt="productos"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <h1 className="relative text-xl sm:text-2xl text-center h-full flex items-center justify-center font-semibold z-10 px-4">
            ⊹ ࣪ ˖ tienda online de productos . ݁⊹
          </h1>
        </div>
        <SearchBar search={search} setSearch={setSearch} />
        <div className="flex flex-wrap justify-center items-center gap-4 my-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded text-[#5B9BD5] border-[#B5DFF7] shadow-sm w-52"
          >
            <option value="">todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded text-[#5B9BD5] border-[#B5DFF7] shadow-sm w-52"
          >
            <option value="">ordenar por</option>
            <option value="price-asc">precio: menor a mayor</option>
            <option value="price-desc">precio: mayor a menor</option>
            <option value="rating-asc">rating: menor a mayor</option>
            <option value="rating-desc">rating: mayor a menor</option>
          </select>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 my-4">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="p-2 rounded text-[#5B9BD5] border-[#B5DFF7] shadow-sm w-52"
          >
            <option value="">Descargar</option>
            <option value="json">Formato JSON</option>
            <option value="csv">Formato CSV</option>
            <option value="excel">Formato Excel</option>{" "}
            {/* (CSV, con extension .xls) */}
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded border text-[#5B9BD5] hover:bg-[#EAF8FE] transition"
          >
            exportar archivo
          </button>
        </div>

        <ProductList products={sortedProducts} />
        {/* renderizacion condicional */}
        {filteredProducts.length === 0 && (
          <div className="text-center mt-4 text-red-600">
            No se encontraron productos!
          </div>
        )}
        <button
          onClick={() => setShow(!show)}
          className="mt-4 px-4 py-2 w-full sm:w-auto text-[#5B9BD5] border rounded hover:bg-[#EAF8FE] transition"
        >
          {show ? "Ocultar estadísticas" : "Mostrar estadísticas"}
        </button>
        {show && (
          <>
            <StatsPanel
              max={max}
              min={min}
              maxTitulo={maxTitulo}
              minTitulo={minTitulo}
              precioTotal={precioTotal}
              precioPromedio={precioPromedio}
              stockMayor50={StockMayor50}
              ratingMayor45={RatingMayor4_5}
              productosPorCategoria={productosPorCategoria}
              precioPromedioPorCategoria={precioPromedioPorCategoria}
              promedioRatingGeneral={promedioRatingGeneral}
              promedioRatingPorCategoria={promedioRatingPorCategoria}
            />
            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="mt-8 max-w-4xl mx-auto">
                <BarChartCategory data={filteredProducts} />
              </div>
              <div className="mt-8 max-w-4xl mx-auto">
                <LineChartPriceEvolution data={filteredProducts} />
              </div>
              <div className="mt-8 max-w-md mx-auto">
                <PieChartStock products={filteredProducts} />
              </div>
            </div>
          </>
        )}
      </div>
      {/* paginacion */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded border transition ${
            page === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-[#28282B] border-[#B5DFF7] hover:bg-[#EAF8FE]"
          }`}
        >
          página anterior
        </button>

        <span className="text-sm text-gray-600">página actual: {page}</span>

        <button
          disabled={filteredProducts.length < limit}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded border transition ${
            filteredProducts.length < limit
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-[#28282B] border-[#B5DFF7] hover:bg-[#EAF8FE]"
          }`}
        >
          página siguiente
        </button>
      </div>
    </div>
  );
}

export default App;
