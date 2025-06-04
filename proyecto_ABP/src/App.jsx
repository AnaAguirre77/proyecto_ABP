import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductList from "./componentes/ProductList";
import StatsPanel from "./componentes/StatsPanel";
import SearchBar from "./componentes/SearchBar";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  // referencias
  const containerRef = useRef(null);

  // conexion con la API, para obtener productos
  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  // trabajando con categorias

  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const filteredProducts = products.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "" || p.category === selectedCategory)
    );
  });

  // para el ordenamiento asc y desc

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

  // trabajando con dark mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
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
        className="mt-4 px-4 py-2 w-full sm:w-auto text-[#4A90E2] border rounded hover:bg-[#EAF8FE] transition"
      >
        MODO {darkMode ? "Claro 🤍" : "Oscuro 🖤"}
      </button>
      <div className="min-h-screen py-8 px-4">
        <h1 className="text-xl sm:text-2xl text-center mb-6 text-[#4A90E2] font-semibold">
          tienda online de productos 🛍️
        </h1>
        <SearchBar search={search} setSearch={setSearch} />

        <div className="flex flex-wrap justify-center items-center gap-4 my-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded text-[#5B9BD5] border-[#B5DFF7] shadow-sm w-52"
          >
            <option value="">todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
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

        <ProductList products={sortedProducts} />

        {/* renderizacion condicional */}
        {filteredProducts.length === 0 && (
          <div className="text-center mt-4 text-red-600">
            No se encontraron productos!
          </div>
        )}

        <button
          onClick={() => setShow(!show)}
          className="mt-4 px-4 py-2 w-full sm:w-auto text-[#4A90E2] border rounded hover:bg-[#EAF8FE] transition"
        >
          {show ? "Ocultar estadísticas" : "Mostrar estadísticas"}
        </button>
        {show && (
          <StatsPanel
            max={max}
            min={min}
            maxTitulo={maxTitulo}
            minTitulo={minTitulo}
            precioTotal={precioTotal}
          />
        )}
      </div>
    </div>
  );
}

export default App;
