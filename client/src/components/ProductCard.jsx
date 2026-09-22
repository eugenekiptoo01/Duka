import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      className="border rounded-lg p-4 hover:shadow-lg transition block"
    >
      <div className="h-40 bg-slate-100 rounded mb-3 flex items-center justify-center text-slate-400">
        Image
      </div>
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-slate-500 text-sm">{product.category}</p>
      <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
    </Link>
  );
}
