import React from 'react';
import { useParams } from 'react-router'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const TourGuideProfile = () => {
  const { id } = useParams(); 

  const { data: tourGuide, isLoading, isError, error } = useQuery({
    queryKey: ['tourGuide', id], 
    queryFn: async () => {
      if (!id) {
        throw new Error('Tour Guide ID is missing');
      }
      const response = await axios.get(`https://tour-system-server.vercel.app/tour-guides/${id}`);
      return response.data;
    },
    enabled: !!id, 
    refetchOnWindowFocus: false, 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5E4] py-16">
        <p className="text-xl text-[#FF9494]">Loading tour guide profile...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Failed to load tour guide profile:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5E4] py-16">
        <p className="text-xl text-red-600">
          Error loading tour guide profile: {error.message || "Please try again later."}
        </p>
      </div>
    );
  }

  if (!tourGuide) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5E4] py-16">
        <p className="text-xl text-gray-600">Tour guide not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5E4] py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl bg-white rounded-lg shadow-xl p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <img
              src={tourGuide.profileImage || 'https://via.placeholder.com/150'}
              alt={tourGuide.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-[#FF9494] shadow-md"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#FF9494] mb-2">{tourGuide.name}</h1>
            <p className="text-xl text-gray-700 mb-2">Specialization: <span className="font-semibold">{tourGuide.specialization || 'General Guide'}</span></p>
            <p className="text-lg text-gray-600 mb-4">{tourGuide.toursCompleted || 0}+ Tours Completed</p>
            <p className="text-gray-800 leading-relaxed">{tourGuide.bio || 'No biography provided.'}</p>
            <p className="text-gray-700 mt-4">Contact: <a href={`mailto:${tourGuide.contactEmail}`} className="text-[#FF9494] hover:underline">{tourGuide.contactEmail}</a></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TourGuideProfile;