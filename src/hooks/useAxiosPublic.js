// src/hooks/useAxiosPublic.js
import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000', // Ensure this matches your backend URL
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;