import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4">Your cart is empty.</p>
        <Link to="/" className="text-emerald-600 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => updateQty(item._id, Number(e.target.value))}
                className="border rounded w-16 px-2 py-1"
              />
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-slate-900 text-white px-4 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
