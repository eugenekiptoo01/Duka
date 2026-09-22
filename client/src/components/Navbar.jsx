import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold">
        Duka
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-emerald-500 text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
        </Link>
        {userInfo ? (
          <>
            <Link to="/orders">Orders</Link>
            <button onClick={handleLogout} className="text-sm text-slate-300 hover:text-white">
              Logout ({userInfo.name})
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
