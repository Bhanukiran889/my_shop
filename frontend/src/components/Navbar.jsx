import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include", // required to send cookies
    });
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    setAuth({ isAuthenticated: false, role: null });
    navigate("/login");
  }
};

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link to="/">Home</Link>
      <div className="space-x-4">
        {auth.isAuthenticated ? (
          <>
            {auth.role === "admin" && <Link to="/admin">Admin</Link>}
            <Link to="/cart">cart</Link>
            <Link to="/orders">My Orders</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
