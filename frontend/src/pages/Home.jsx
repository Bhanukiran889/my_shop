// pages/Home.jsx
import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{p.name}</h2>
            <p>₹{p.price}</p>
            <button className="bg-blue-500 text-white px-2 py-1 mt-2 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
