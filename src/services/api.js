import axios from "axios";
//201.33.248.208
const api = axios.create({
  baseURL: "http://192.168.0.75:3332/",
});

export default api;
