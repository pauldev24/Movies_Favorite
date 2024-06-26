import axios from 'axios'

const axios_ins = axios.create({
  //baseURL: 'http://localhost:5000/api/',
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/',
  withCredentials: true,
});

export default axios_ins;