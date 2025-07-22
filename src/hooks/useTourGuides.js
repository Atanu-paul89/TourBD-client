
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure'; 

const useTourGuides = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tourGuides = [], isLoading, error, refetch } = useQuery({
        queryKey: ['tourGuides'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tour-guides'); 
            return res.data;
        },

    });

    return { tourGuides, isLoading, error, refetch };
};

export default useTourGuides;
