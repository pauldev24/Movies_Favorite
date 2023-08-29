import axios from 'axios'

const axios_ins = axios.create({
  baseURL: 'http://localhost:5000/api/',
  //baseURL: 'https://your-pa-movies.onrender.com/api/',
  withCredentials: true,
});

export default axios_ins;