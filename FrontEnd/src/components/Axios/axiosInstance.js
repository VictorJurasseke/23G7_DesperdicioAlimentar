// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.21.80.1:3025/api/hatch', // ip
});

export default axiosInstance;
