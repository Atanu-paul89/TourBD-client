import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://tour-system-server.vercel.app', 
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;