import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
  baseURL: baseURL,
  });
  instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response && response.data ? response.data : response;
}, function (error) {
  return error?.response?.data ?? Promise.reject(error);
});

  export default instance;