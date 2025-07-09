import { useEffect, useState } from 'react';
import api from '../utils/axiosConfig';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setItems(res.data.items || []);
    } catch  {
      alert('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      setItems(items.filter((item) => item.product._id !== productId));
    } catch {
      alert('Failed to remove item');
    }
  };

  const placeOrder = async () => {
    try {
      await api.post('/orders');
      alert('Order placed!');
      setItems([]);
    } catch {
      alert('Order failed');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product._id} className="flex justify-between border-b pb-2">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>₹{product.price} x {quantity}</p>
              </div>
              <button
                onClick={() => removeItem(product._id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="font-bold text-lg">Total: ₹{total}</p>
            <button
              onClick={placeOrder}
              className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
