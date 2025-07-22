// src/hooks/useTourGuides.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure'; // Your custom axios secure hook

const useTourGuides = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tourGuides = [], isLoading, error, refetch } = useQuery({
        queryKey: ['tourGuides'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tour-guides'); // Assuming this endpoint exists or you'll create it
            return res.data;
        },
        // Optionally, add staleTime, cacheTime, etc.
    });

    return { tourGuides, isLoading, error, refetch };
};

export default useTourGuides;
