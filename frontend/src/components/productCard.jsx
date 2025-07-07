// components/ProductCard.jsx
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-semibold">{product.name}</h2>
      <p>₹{product.price}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
