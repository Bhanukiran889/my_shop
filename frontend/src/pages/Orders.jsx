import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/orders');
      setOrders(res.data);
    } catch {
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading orders...</p>;

  if (orders.length === 0) return <p className="text-center mt-8">No orders yet.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="border rounded mb-6 p-4 shadow">
          <p className="text-sm text-gray-600 mb-2">
            Order placed on: {new Date(order.createdAt).toLocaleString()}
          </p>
          {order.items.map(({ product, quantity }, index) => (
            <div key={index} className="flex justify-between mb-1 text-sm">
              <div>{product?.name || 'Product removed'}</div>
              <div>Qty: {quantity}</div>
            </div>
          ))}
          <p className="mt-2 text-right font-semibold">Total: ₹{order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
