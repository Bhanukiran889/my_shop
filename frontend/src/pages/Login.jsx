import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from '../utils/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // important to include cookies!
      body: JSON.stringify({ email: form.email, password: form.password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    setAuth({ isAuthenticated: true, role: data.role });
    navigate(data.role === "admin" ? "/admin" : "/");
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
