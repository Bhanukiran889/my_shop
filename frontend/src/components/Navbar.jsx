import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../utils/axiosConfig';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout'); // Backend should clear cookie
      setAuth({ isAuthenticated: false, role: null });
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-blue-600 text-white">
      <Link to="/" className="text-xl font-bold">🛒 Shop</Link>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        {auth.isAuthenticated && <Link to="/cart">Cart</Link>}
        {auth.role === 'admin' && <Link to="/admin">Admin</Link>}

        {!auth.isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
