

// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { Link } from 'react-router'; // For redirecting to Package Details

// const AllTrips = () => {
//   const { data: packages, isLoading, isError, error } = useQuery({
//     queryKey: ['allPackages'], // Unique key for this query
//     queryFn: async () => {
//       const response = await axios.get('http://localhost:5000/packages'); // Adjust your backend URL if different
//       return response.data;
//     }
//   });

//   if (isLoading) {
//     return <div className="text-center py-8">Loading packages...</div>;
//   }

//   if (isError) {
//     return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-center mb-8">All Available Trips</h1>
//       <p className="text-center text-lg mb-12">Explore all our exciting tour packages.</p>

//       {packages.length === 0 ? (
//         <div className="text-center text-xl text-gray-600">No packages available yet.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {packages.map((pkg) => (
//             <div key={pkg._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
//               <img src={pkg.image} alt={pkg.tripTitle} className="w-full h-48 object-cover" />
//               <div className="p-6">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">{pkg.tripTitle}</h2>
//                 <p className="text-gray-600 mb-2">
//                   <span className="font-medium">Tour Type:</span> {pkg.tourType}
//                 </p>
//                 <p className="text-gray-700 text-xl font-bold mb-4">${pkg.price}</p>
//                 <Link to={`/packages/${pkg._id}`} className="block w-full bg-pink-500 text-white py-3 px-4 rounded-md text-center hover:bg-pink-600 transition duration-300">
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllTrips;



// src/pages/AllTrips.jsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // Make sure you have axios installed: npm install axios
import { Link } from 'react-router';

const AllTrips = () => {
  const { data: packages, isLoading, isError, error } = useQuery({
    queryKey: ['allPackages'], // Unique key for this query
    queryFn: async () => {
      // ** IMPORTANT: Adjust your backend URL if it's different from localhost:5000 **
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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#FF9494] text-center mb-6">
        Discover All Our Exciting Trips
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
        Browse through our complete collection of tour packages and find your next adventure.
        From cultural explorations to thrilling escapades, we have something for everyone.
      </p>

      {packages.length === 0 ? (
        <div className="text-center text-2xl text-gray-600 py-16">
          No tour packages are available at the moment. Please check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-102">
              <img
                src={pkg.image} // Assuming your package object has an 'image' field for the URL
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
                  {/* You might want to add duration, group size, etc. here if available */}
                </div>
                <Link
                  to={`/packages/${pkg._id}`} // Link to the specific package details page
                  className="block w-full bg-[#FF9494] text-white py-3 px-6 rounded-md text-center text-lg font-semibold hover:bg-[#E07B7B] transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTrips;
