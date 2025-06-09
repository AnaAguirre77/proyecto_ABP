function ProductItem({ title, price }) {
  return (
    <li className="bg-[#EAF8FE] rounded-lg shadow hover:shadow-lg p-4 transition duration-200">
      <h3 className="text-black font-semibold text-lg mb-2">{title}</h3>
      <p className="font-semibold text-[#5B9BD5] mb-4">💲{price}</p>
    </li>
  );
}

export default ProductItem;
