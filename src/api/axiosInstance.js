import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5296',
});

export default api;