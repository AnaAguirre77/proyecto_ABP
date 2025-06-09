function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Buscar un producto..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="block mx-auto p-2 mb-6 rounded text-[#e47444] border-[#B5DFF7] shadow-sm focus:outline-none focus:ring focus:border-[#A0D8EF]"
    />
  );
}

export default SearchBar;
