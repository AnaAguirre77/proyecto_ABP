import ProductItem from "./ProductItem";

function ProductList(props) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {props.products.map((p) => (
        <ProductItem key={p.id} title={p.title} price={p.price} />
      ))}
    </ul>
  );
}

export default ProductList;
