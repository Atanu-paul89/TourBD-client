
// import React from 'react';
// import { Link, useParams } from 'react-router';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const PackageDetails = () => {
//   const { id } = useParams(); // Get the package ID from the URL

//   const { data: packageDetails, isLoading, isError, error } = useQuery({
//     queryKey: ['packageDetails', id], // Unique key for this query, includes ID
//     queryFn: async () => {
//       // ** IMPORTANT: Adjust your backend URL if different from localhost:5000 **
//       const response = await axios.get(`http://localhost:5000/packages/${id}`);
//       return response.data;
//     },
//     // Optional: Add refetchOnWindowFocus: false if you don't want it refetching every time window is focused
//     refetchOnWindowFocus: false,
//   });

//   if (isLoading) {
//     return <div className="text-center py-16 text-2xl font-semibold text-gray-700">Loading package details...</div>;
//   }

//   if (isError) {
//     return <div className="text-center py-16 text-2xl font-bold text-red-600">Error loading package: {error.message}</div>;
//   }

//   if (!packageDetails) {
//     return <div className="text-center py-16 text-2xl text-gray-500">Package not found.</div>;
//   }

//   // Destructure properties from packageDetails (adjust names based on your actual data)
//   const {
//     image, // Assuming a single main image for simplicity for now
//     images, // If you have a gallery array of image URLs
//     tripTitle,
//     tourType,
//     price,
//     description,
//     tourPlan, // Assuming this is an array of objects for daily plans
//     tourGuides, // Assuming this is an array of tour guide objects/IDs
//   } = packageDetails;

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-4xl md:text-5xl font-extrabold text-[#FF9494] text-center mb-6">
//         {tripTitle}
//       </h1>
//       <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
//         A detailed look at your chosen adventure.
//       </p>

//       {/* Main Image / Gallery Section */}
//       <div className="mb-10">
//         {images && images.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {/* Display multiple images from a 'images' array if available */}
//             {images.map((imgSrc, index) => (
//               <img key={index} src={imgSrc} alt={`${tripTitle} image ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
//             ))}
//           </div>
//         ) : (
//           // Fallback to a single 'image' field if 'images' array is not present or empty
//           image && (
//             <img src={image} alt={tripTitle} className="w-full h-96 object-cover rounded-lg shadow-xl" />
//           )
//         )}
//       </div>

//       {/* About The Tour Section */}
//       <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">About This Tour</h2>
//         <p className="text-gray-700 leading-relaxed">
//           {description || "No detailed description available for this package yet."}
//         </p>
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
//           <p className="text-gray-700">
//             <span className="font-semibold text-[#FF9499]">Tour Type:</span> {tourType}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-semibold text-[#FF9499]">Price:</span> ${price}
//           </p>
//           {/* Add more package details here as needed, e.g., duration, group size */}
//         </div>
//       </div>

//       {/* Tour Plan / Itinerary Section */}
//       {tourPlan && tourPlan.length > 0 && (
//         <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Tour Plan</h2>
//           {tourPlan.map((plan, index) => (
//             <div key={index} className="mb-6 last:mb-0">
//               <h3 className="text-2xl font-semibold text-[#FF9494] mb-2">Day {index + 1}: {plan.title}</h3>
//               <p className="text-gray-700 leading-relaxed">{plan.details}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Tour Guides Section */}
//       {tourGuides && tourGuides.length > 0 && (
//         <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Guides for This Tour</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {tourGuides.map((guide) => (
//               <div key={guide._id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
//                 <img src={guide.profileImage || 'https://via.placeholder.com/60'} alt={guide.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#FF9494]" />
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800">{guide.name}</h3>
//                   <Link to={`/tour-guides/${guide._id}`} className="text-[#FF9494] font-semibold hover:underline text-sm">
//                     View Profile
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Booking Form Section - This will be implemented in a later step */}
//       <div className="bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Book This Trip</h2>
//         <p className="text-gray-600">
//           *The booking form will appear here. (Includes package name, your name/email/image (read-only), price, tour date picker, tour guide dropdown, and a protected "Book Now" button)
//         </p>
//         <p className="mt-4 text-sm text-gray-500">
//           This section will be implemented in a subsequent step, involving user authentication and data submission.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PackageDetails;



// import { useParams, Link } from 'react-router'; // Import Link
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { Helmet } from 'react-helmet-async'; // For SEO

// const PackageDetails = () => {
//   const { id } = useParams();

//   // Query to fetch package details
//   const { data: packageDetails, isLoading: packageLoading, isError: packageError, error: packageFetchError } = useQuery({
//     queryKey: ['packageDetails', id],
//     queryFn: async () => {
//       if (!id) {
//         throw new Error('Package ID is missing');
//       }
//       const response = await axios.get(`http://localhost:5000/packages/${id}`);
//       return response.data;
//     },
//     enabled: !!id,
//   });

//   // Query to fetch tour guide details for the package
//   // This query is dependent on packageDetails being available and having tourGuides
//   const { data: tourGuidesForPackage, isLoading: guidesLoading, isError: guidesError, error: guidesFetchError } = useQuery({
//     queryKey: ['tourGuidesForPackage', id, packageDetails?.tourGuides],
//     queryFn: async () => {
//       if (!packageDetails || !packageDetails.tourGuides || packageDetails.tourGuides.length === 0) {
//         return []; // No guides to fetch
//       }
//       // Fetch each guide individually, or create a single endpoint on backend to fetch multiple by IDs
//       const guidePromises = packageDetails.tourGuides.map(guideId =>
//         axios.get(`http://localhost:5000/tour-guides/${guideId}`)
//       );
//       const responses = await Promise.all(guidePromises);
//       return responses.map(res => res.data);
//     },
//     // Only enable this query if packageDetails is loaded and has tourGuides
//     enabled: !!packageDetails && packageDetails.tourGuides && packageDetails.tourGuides.length > 0,
//   });


//   if (packageLoading || guidesLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FFF5E4] py-16">
//         <p className="text-xl text-[#FF9494]">Loading package details...</p>
//       </div>
//     );
//   }

//   if (packageError) {
//     console.error("Failed to load package details:", packageFetchError);
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FFF5E4] py-16">
//         <p className="text-xl text-red-600">
//           Error loading package: {packageFetchError.message || "Request failed with status code 500"}         </p>
//       </div>
//     );
//   }

//   if (!packageDetails) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FFF5E4] py-16">
//         <p className="text-xl text-gray-600">Package not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FFF5E4] py-16">
//       <Helmet>
//         <title>TourBD - {packageDetails.tripTitle}</title>
//       </Helmet>
//       <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl bg-white rounded-lg shadow-xl p-8">
//         <h1 className="text-5xl font-extrabold text-[#FF9494] text-center mb-8">{packageDetails.tripTitle}</h1>
//         <p className="text-center text-lg text-gray-600 mb-10">A detailed look at your chosen adventure.</p>

//         {/* Image Gallery Section */}
//         {packageDetails.images && packageDetails.images.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
//             {packageDetails.images.map((img, index) => (
//               <img key={index} src={img} alt={`${packageDetails.tripTitle} image ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
//             ))}
//           </div>
//         )}

//         {/* About The Tour Section */}
//         <div className="mb-10 p-6 bg-[#FFF5E4] rounded-lg shadow-inner">
//           <h2 className="text-3xl font-bold text-[#FF9494] mb-4">About This Tour</h2>
//           <p className="text-gray-800 leading-relaxed mb-4">{packageDetails.description}</p>
//           <p className="text-lg text-gray-700 font-semibold">Tour Type: <span className="text-gray-600">{packageDetails.tourType}</span></p>
//           <p className="text-lg text-gray-700 font-semibold">Price: <span className="text-[#FF9494] font-bold">${packageDetails.price}</span></p>
//         </div>

//         {/* Tour Plan Section */}
//         {packageDetails.tourPlan && packageDetails.tourPlan.length > 0 && (
//           <div className="mb-10 p-6 bg-[#FFF5E4] rounded-lg shadow-inner">
//             <h2 className="text-3xl font-bold text-[#FF9494] mb-6">Tour Plan</h2>
//             <div className="space-y-4">
//               {packageDetails.tourPlan.map((plan, index) => (
//                 <div key={index} className="border-l-4 border-[#FF9494] pl-4">
//                   <h3 className="text-xl font-semibold text-gray-800">{plan.day}: {plan.title}</h3>
//                   <p className="text-gray-700">{plan.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Our Guides for This Tour Section */}
//         <div className="mb-10 p-6 bg-[#FFF5E4] rounded-lg shadow-inner">
//           <h2 className="text-3xl font-bold text-[#FF9494] mb-6">Our Guides for This Tour</h2>
//           {guidesError && (
//             <p className="text-red-600 text-center mb-4">Error loading guides for this package. </p>
//           )}
//           {tourGuidesForPackage && tourGuidesForPackage.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {tourGuidesForPackage.map(guide => (
//                 <div key={guide._id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
//                   <img src={guide.profileImage || 'https://via.placeholder.com/60'} alt={guide.name} className="w-16 h-16 rounded-full object-cover" />
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">{guide.name}</h3>
//                     <p className="text-gray-600 text-sm">{guide.specialization}</p>
//                     <Link to={`/tour-guides/${guide._id}`} className="text-[#FF9494] hover:underline text-sm">
//                       View Profile
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-700 text-center">No dedicated guides found for this tour yet.</p>
//           )}
//         </div>

//         {/* Booking Form Section - (Placeholder as per previous instructions) */}
//         <div className="p-6 bg-[#FFF5E4] rounded-lg shadow-inner">
//           <h2 className="text-3xl font-bold text-[#FF9494] mb-4">Book This Trip</h2>
//           <p className="text-gray-700 italic">
//             *The booking form will appear here. (Includes package name, your name/email/image (read-only), price, tour date picker, tour guide dropdown, and a protected "Book Now" button)
//           </p>
//           <p className="text-gray-700 mt-2">
//             This section will be implemented in a subsequent step, involving user authentication and data submission.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageDetails;
import React from 'react';
import { Link, useParams } from 'react-router'; // <--- CHANGE: Import Link from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PackageDetails = () => {
  const { id } = useParams(); // Get the package ID from the URL

  // Query to fetch package details
  const { data: packageDetails, isLoading: packageLoading, isError: packageError, error: packageFetchError } = useQuery({
    queryKey: ['packageDetails', id], // Unique key for this query, includes ID
    queryFn: async () => {
      if (!id) {
        throw new Error('Package ID is missing');
      }
      // ** IMPORTANT: Adjust your backend URL if different from localhost:5000 **
      const response = await axios.get(`http://localhost:5000/packages/${id}`);
      return response.data;
    },
    refetchOnWindowFocus: false, // Optional: Add refetchOnWindowFocus: false
    enabled: !!id, // Only enable query if id exists
  });

  // Query to fetch tour guide details for the package
  const { data: tourGuidesForPackage, isLoading: guidesLoading, isError: guidesError, error: guidesFetchError } = useQuery({
    queryKey: ['tourGuidesForPackage', id, packageDetails?.tourGuides], // Include packageDetails?.tourGuides in key
    queryFn: async () => {
      if (!packageDetails || !packageDetails.tourGuides || packageDetails.tourGuides.length === 0) {
        return []; // No guides to fetch or array is empty
      }
      // Fetch each guide individually based on their ID
      const guidePromises = packageDetails.tourGuides.map(guideId =>
        axios.get(`http://localhost:5000/tour-guides/${guideId}`)
      );
      const responses = await Promise.all(guidePromises);
      return responses.map(res => res.data); // Extract data from each response
    },
    // Only enable this query if packageDetails is loaded and has tourGuides IDs
    enabled: !!packageDetails && packageDetails.tourGuides && packageDetails.tourGuides.length > 0,
  });


  if (packageLoading || guidesLoading) {
    return <div className="text-center py-16 text-2xl font-semibold text-gray-700">Loading package details...</div>;
  }

  if (packageError) {
    console.error("Error fetching package:", packageFetchError); // Log the actual error
    return <div className="text-center py-16 text-2xl font-bold text-red-600">Error loading package: {packageFetchError.message}</div>;
  }

  if (!packageDetails) {
    return <div className="text-center py-16 text-2xl text-gray-500">Package not found.</div>;
  }

  // Destructure properties from packageDetails (adjust names based on your actual data)
  const {
    image, // Assuming a single main image for simplicity for now
    images, // If you have a gallery array of image URLs
    tripTitle,
    tourType,
    price,
    description,
    tourPlan, // Assuming this is an array of objects for daily plans
    // tourGuides // This is no longer directly used from packageDetails as we fetch them separately
  } = packageDetails;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#FF9494] text-center mb-6">
        {tripTitle}
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
        A detailed look at your chosen adventure.
      </p>

      {/* Main Image / Gallery Section */}
      <div className="mb-10">
        {images && images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Display multiple images from a 'images' array if available */}
            {images.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt={`${tripTitle} image ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
            ))}
          </div>
        ) : (
          // Fallback to a single 'image' field if 'images' array is not present or empty
          image && (
            <img src={image} alt={tripTitle} className="w-full h-96 object-cover rounded-lg shadow-xl" />
          )
        )}
      </div>

      {/* About The Tour Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About This Tour</h2>
        <p className="text-gray-700 leading-relaxed">
          {description || "No detailed description available for this package yet."}
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <p className="text-gray-700">
            <span className="font-semibold text-[#FF9499]">Tour Type:</span> {tourType}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-[#FF9499]">Price:</span> ${price}
          </p>
          {/* Add more package details here as needed, e.g., duration, group size */}
        </div>
      </div>

      {/* Tour Plan / Itinerary Section */}
      {tourPlan && tourPlan.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Tour Plan</h2>
          {tourPlan.map((plan, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-2xl font-semibold text-[#FF9494] mb-2">Day {index + 1}: {plan.title}</h3>
              <p className="text-gray-700 leading-relaxed">{plan.description}</p> {/* Use plan.description based on your JSON */}
            </div>
          ))}
        </div>
      )}

      {/* Tour Guides Section */}
      {guidesError && (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
          <p className="text-red-600 text-center text-xl">Error loading guides: {guidesFetchError?.message || "Something went wrong."}</p>
        </div>
      )}
      {tourGuidesForPackage && tourGuidesForPackage.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Guides for This Tour</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourGuidesForPackage.map((guide) => (
              <div key={guide._id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                <img src={guide.profileImage || 'https://via.placeholder.com/60'} alt={guide.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#FF9494]" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{guide.name}</h3>
                  <p className="text-gray-600 text-sm">{guide.specialization}</p>
                  <Link to={`/tour-guides/${guide._id}`} className="text-[#FF9494] font-semibold hover:underline text-sm">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Show message if no guides linked or found */}
      {(!tourGuidesForPackage || tourGuidesForPackage.length === 0) && !guidesLoading && !guidesError && (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Guides for This Tour</h2>
            <p className="text-gray-700 text-center">No dedicated guides found for this tour yet.</p>
          </div>
      )}

      {/* Booking Form Section - This will be implemented in a later step */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Book This Trip</h2>
        <p className="text-gray-600">
          *The booking form will appear here. (Includes package name, your name/email/image (read-only), price, tour date picker, tour guide dropdown, and a protected "Book Now" button)
        </p>
        <p className="mt-4 text-sm text-gray-500">
          This section will be implemented in a subsequent step, involving user authentication and data submission.
        </p>
      </div>
    </div>
  );
};

export default PackageDetails;