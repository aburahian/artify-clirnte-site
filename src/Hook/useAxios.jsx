import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://artify-server-site.vercel.app",
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
