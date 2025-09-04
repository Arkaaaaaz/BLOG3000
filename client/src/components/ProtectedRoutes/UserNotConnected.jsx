import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserNotConnected({ children }) {
  const { UserConnected } = useAuth();
  return !UserConnected ? children : <Navigate to="/" />;
}
