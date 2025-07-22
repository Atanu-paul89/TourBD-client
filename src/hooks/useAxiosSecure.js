
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthContext";


// Create a custom Axios instance
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', 
    withCredentials: true, 
});

const useAxiosSecure = () => {
    const { logout } = useContext(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {
        // Add a request interceptor to attach the JWT token
        axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token'); // Get token from localStorage
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor to handle 401/403 errors (unauthorized/forbidden)
        axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async function (error) {
            const status = error.response?.status;
            // For 401 or 403 status codes, log out the user and redirect to login
            if (status === 401 || status === 403) {
                console.log('Unauthorized or Forbidden access. Logging out...');
                await logout(); // Call your logout function
                navigate('/login'); // Redirect to login page
            }
            return Promise.reject(error);
        });
    }, [logout, navigate]); 

    return axiosSecure;
};

export default useAxiosSecure; 


