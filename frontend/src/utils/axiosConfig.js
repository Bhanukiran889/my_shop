import axios from 'axios';

const api = axios.create({
  baseURL: 
  'https://my-shop-xr30.onrender.com/api',
  withCredentials: true,
});

export default api;
