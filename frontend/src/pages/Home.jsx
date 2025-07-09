// pages/Home.jsx
import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await api.post("/cart", {
        productId: product._id,
        quantity: 1, // default quantity 1
      });
      alert("Added to cart!");
    } catch  {
      alert("Failed to add to cart. Maybe you're not logged in?");
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;
