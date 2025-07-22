
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthContext";


const axiosSecure = axios.create({
    baseURL: 'https://tour-system-server.vercel.app', 
    withCredentials: true, 
});

const useAxiosSecure = () => {
    const { logout } = useContext(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token'); 
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async function (error) {
            const status = error.response?.status;

            if (status === 401 || status === 403) {
                console.log('Unauthorized or Forbidden access. Logging out...');
                await logout(); 
                navigate('/login'); 
            }
            return Promise.reject(error);
        });
    }, [logout, navigate]); 

    return axiosSecure;
};

export default useAxiosSecure; 


