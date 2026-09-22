import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (search = "") => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products${search ? `?keyword=${search}` : ""}`);
      setProducts(data);
      setError("");
    } catch (err) {
      setError("Could not load products. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(keyword);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
          className="border rounded px-3 py-2 flex-1"
        />
        <button className="bg-slate-900 text-white px-4 py-2 rounded">Search</button>
      </form>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      {!loading && !error && products.length === 0 && (
        <p className="text-slate-500 mt-4">No products found. Run the seed script on the server.</p>
      )}
    </div>
  );
}
