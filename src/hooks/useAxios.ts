import axios from "axios";
import useAuth from "../hooks/useAuth";
import { baseUrl } from "../utils/baseUrl";

const useAxios = () => {
    const { auth } = useAuth();

    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
            Authorization: `Bearer ${auth?.accessToken || ""}`,
        },
        withCredentials: true,
    });

    return axiosInstance;
};

export default useAxios;
