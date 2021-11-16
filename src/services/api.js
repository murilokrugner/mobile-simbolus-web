import axios from "axios";
//201.33.248.208
const api = axios.create({
  baseURL: "http://localhost:3333/",
});

export default api;
