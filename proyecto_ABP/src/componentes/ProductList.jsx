function ProductList(props) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {props.products.map((p) => (
        <li
          key={p.id}
          className="bg-[#EAF8FE] rounded-lg shadow hover:shadow-lg p-4 transition duration-200"
        >
          <h3 className=" text-black font-semibold text-lg mb-2">{p.title}</h3>
          <p className="font-semibold text-[#5B9BD5 mb-4]">${p.price}</p>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
