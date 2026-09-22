import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product, Number(qty));
    navigate("/cart");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid sm:grid-cols-2 gap-8">
      <div className="h-64 bg-slate-100 rounded flex items-center justify-center text-slate-400">
        Image
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-slate-500 mt-1">{product.category}</p>
        <p className="mt-4">{product.description}</p>
        <p className="text-xl font-bold mt-4">${product.price.toFixed(2)}</p>
        <p className="text-sm text-slate-500 mt-1">
          {product.countInStock > 0 ? `${product.countInStock} in stock` : "Out of stock"}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <input
            type="number"
            min="1"
            max={product.countInStock}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border rounded w-20 px-2 py-1"
          />
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="bg-slate-900 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
