// pages/Home.jsx
import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import ProductCard from "../components/productCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;
