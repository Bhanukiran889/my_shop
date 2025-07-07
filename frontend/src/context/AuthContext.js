import { createContext, useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null });

  const checkAuth = async () => {
    try {
      const res = await axios.get('/auth/me'); // Backend should verify JWT in cookie
      setAuth({ isAuthenticated: true, role: res.data.role });
    } catch {
      setAuth({ isAuthenticated: false, role: null });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
