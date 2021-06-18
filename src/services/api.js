import axios from 'axios';

const api = axios.create({
  baseURL: 'http://201.33.248.208:3333',
});

export default api;