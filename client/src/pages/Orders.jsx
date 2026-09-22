import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/myorders").then(({ data }) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  if (orders.length === 0) {
    return <p className="p-6">You have no orders yet.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="border rounded p-4">
            <p className="font-medium">Order #{order._id}</p>
            <p className="text-sm text-slate-500">
              {new Date(order.createdAt).toLocaleDateString()} — {order.orderItems.length} item(s)
            </p>
            <p className="font-bold mt-1">${order.totalPrice.toFixed(2)}</p>
            <p className="text-sm mt-1">
              {order.isDelivered ? "Delivered" : "Processing"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
