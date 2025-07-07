import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null });

  const checkAuth = async () => {
    try {
      const res = await axios.get('/auth/me');
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
