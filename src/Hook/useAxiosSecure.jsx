import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://artify-server-site.vercel.app",
});
const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    const requestInstance = axiosInstance.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
    return () => {
      axiosInstance.interceptors.request.eject(requestInstance);
    };
  }, [user]);
  return axiosInstance;
};

export default useAxiosSecure;
