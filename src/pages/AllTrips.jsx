
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import axios from 'axios';
import { Link } from 'react-router';
import { motion } from 'framer-motion'; 

const AllTrips = () => {
  const [sortOrder, setSortOrder] = useState(null); 

  const { data: packages, isLoading, isError, error } = useQuery({ 
    queryKey: ['allPackages'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/packages');
      return response.data;
    }
  });

  if (isLoading) {
    return <div className="text-center py-8 text-xl font-medium">Loading packages...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-600 text-xl font-bold">Error: {error.message}</div>;
  }


  const sortedPackages = packages ? [...packages].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price; 
    } else if (sortOrder === 'desc') {
      return b.price - a.price; 
    }
    return 0; 
  }) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#FF9494] text-center mb-6">
        Discover All Our Exciting Trips
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
        Browse through our complete collection of tour packages and find your next adventure.
        From cultural explorations to thrilling escapades, we have something for everyone.
      </p>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSortOrder('asc')}
          className={`px-6 py-3 rounded-md font-semibold transition duration-300
            ${sortOrder === 'asc' ? 'bg-[#FF9494] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => setSortOrder('desc')}
          className={`px-6 py-3 rounded-md font-semibold transition duration-300
            ${sortOrder === 'desc' ? 'bg-[#FF9494] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Price: High to Low
        </button>
        <button
          onClick={() => setSortOrder(null)}
          className={`px-6 py-3 rounded-md font-semibold transition duration-300
            ${sortOrder === null ? 'bg-[#FF9494] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Reset Sort
        </button>
      </div>

      {sortedPackages.length === 0 ? (
        <div className="text-center text-2xl text-gray-600 py-16">
          No tour packages are available at the moment. Please check back later!
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedPackages.map((pkg) => (
            <motion.div 
              key={pkg._id}
              className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-102"
              variants={itemVariants} 
            >
              <img
                src={pkg.image}
                alt={pkg.tripTitle}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{pkg.tripTitle}</h2>
                <p className="text-md text-gray-600 mb-3">
                  <span className="font-semibold text-gray-700">Tour Type:</span> {pkg.tourType}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-extrabold text-[#FF9494]">${pkg.price}</span>
                </div>
                <Link
                  to={`/packages/${pkg._id}`}
                  className="block w-full bg-[#FF9494] text-white py-3 px-6 rounded-md text-center text-lg font-semibold hover:bg-[#E07B7B] transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllTrips;
