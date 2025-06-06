import axios from 'axios';

// Create an Axios instance with custom configuration
const tradeAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TRADE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to dynamically set the authorization header
tradeAxiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('auth-token');
    // if (token) {
    //   config.headers.Authorization = `${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default tradeAxiosInstance;
