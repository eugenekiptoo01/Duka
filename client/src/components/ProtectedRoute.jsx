import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { userInfo } = useAuth();
  return userInfo ? children : <Navigate to="/login" replace />;
}
