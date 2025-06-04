import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./componentes/ProductList";
import StatsPanel from "./componentes/StatsPanel";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);

  // conexion con la API
  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const max = Math.max(...filteredProducts.map((p) => p.price));
  const min = Math.min(...filteredProducts.map((p) => p.price));

  const maxTitulo = filteredProducts.find((p) => p.price === max)?.title || "";
  const minTitulo = filteredProducts.find((p) => p.price === min)?.title || "";

  const precioTotal = filteredProducts.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="bg-[#D0F0FD] min-h-screen py-8 px-4">
      <h1 className="text-2xl text-center mb-6 text-[#4A90E2] font-semibold">
        tienda online de productos 🛍️
      </h1>
      <input
        type="text"
        placeholder="Buscar un producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block mx-auto p-2 mb-6 rounded border-[#B5DFF7] shadow-sm focus:outline-none focus:ring focus:border-[#A0D8EF]"
      />
      <ProductList products={filteredProducts} />

      {/* renderizacion condicional */}
      {filteredProducts.length === 0 && (
        <div className="text-center mt-4 text-red-600">
          No se encontraron productos!
        </div>
      )}

      <button
        onClick={() => setShow(!show)}
        className="mt-4 px-4 py-2 text-[#4A90E2] border rounded hover:bg-[#EAF8FE] transition"
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
  );
}

export default App;
