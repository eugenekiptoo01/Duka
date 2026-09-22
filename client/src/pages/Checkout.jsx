import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ address: "", city: "", postalCode: "", country: "" });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setError("");
    try {
      const orderItems = cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      }));

      const { data } = await api.post("/orders", {
        orderItems,
        shippingAddress: form,
        paymentMethod: "Cash on Delivery",
        itemsPrice: totalPrice,
        shippingPrice: 0,
        totalPrice,
      });

      clearCart();
      navigate(`/orders`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order. Are you logged in?");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handlePlaceOrder} className="space-y-3">
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />
        <input
          name="postalCode"
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />
        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />
        <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button
          disabled={placing}
          className="bg-slate-900 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {placing ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
