// // src/components/MyAssignedTours.jsx
// import { useEffect, useState } from 'react';
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Icons for actions

// const MyAssignedTours = ({ user, axiosSecure }) => { // user and axiosSecure are passed as props
//     const [assignedTours, setAssignedTours] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchAssignedTours = async () => {
//         // IMPORTANT: Only proceed if both user.email and axiosSecure are valid
//         if (!user?.email || !axiosSecure) {
//             setLoading(false); // Stop loading if prerequisites are not met
//             console.log("Skipping fetch: user or axiosSecure not available yet.");
//             return;
//         }

//         try {
//             setLoading(true);
//             const response = await axiosSecure.get(`/assigned-tours`);
//             setAssignedTours(response.data);
//             setError(null); // Clear any previous errors on successful fetch
//         } catch (err) {
//             console.error("Error fetching assigned tours:", err);
//             setError("Failed to load assigned tours. Please try again later.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         // This useEffect will run when user or axiosSecure changes
//         // It's essential that axiosSecure is ready before fetching
//         fetchAssignedTours();
//     }, [user, axiosSecure]); // Depend on user and axiosSecure props

//     const handleAcceptTour = async (bookingId) => {
//         if (!window.confirm("Are you sure you want to accept this tour?")) {
//             return;
//         }
//         if (!axiosSecure) return; // Guard against axiosSecure being undefined
//         try {
//             await axiosSecure.patch(`/bookings/${bookingId}/accept`);
//             alert('Tour accepted successfully!');
//             fetchAssignedTours(); // Re-fetch to update UI and status
//         } catch (err) {
//             console.error("Error accepting tour:", err);
//             alert('Failed to accept tour: ' + (err.response?.data?.message || err.message || "An unknown error occurred."));
//         }
//     };

//     const handleRejectTour = async (bookingId) => {
//         if (!window.confirm("Are you sure you want to reject this tour?")) {
//             return;
//         }
//         if (!axiosSecure) return; // Guard against axiosSecure being undefined
//         const rejectionReason = prompt("Please provide a reason for rejecting this tour (optional):");
//         try {
//             await axiosSecure.patch(`/bookings/${bookingId}/reject`, { rejectionReason });
//             alert('Tour rejected successfully!');
//             fetchAssignedTours(); // Re-fetch to update UI and status
//         } catch (err) {
//             console.error("Error rejecting tour:", err);
//             alert('Failed to reject tour: ' + (err.response?.data?.message || err.message || "An unknown error occurred."));
//         }
//     };

//     if (loading) {
//         return <div className="text-center py-10 text-lg font-medium">Loading assigned tours...</div>;
//     }

//     if (error) {
//         return <div className="text-center py-10 text-red-500 text-lg">{error}</div>;
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-3xl font-bold text-[#FF9494] mb-8 text-center">My Assigned Tours</h1>

//             {assignedTours.length === 0 ? (
//                 <p className="text-center text-gray-600 text-lg">You currently have no tours assigned to you.</p>
//             ) : (
//                 <>
//                     {/* Table for Larger Displays (md and up) */}
//                     <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Package Name
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Tourist Name
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Booking Date
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Tour Date
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Price
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Status
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {assignedTours.map((tour) => (
//                                     <tr key={tour._id}>
//                                         <td className="px-6 py-4 whitespace-nowrap">{tour.packageName}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">{tour.touristName}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {new Date(tour.bookingDate).toLocaleDateString()}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {new Date(tour.tourDate).toLocaleDateString()}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">${tour.price}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                                                 ${tour.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
//                                                 ${tour.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
//                                                 ${tour.status === 'rejected' || tour.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
//                                             `}>
//                                                 {tour.status}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             {tour.status === 'pending' && (
//                                                 <div className="flex gap-2">
//                                                     <button
//                                                         onClick={() => handleAcceptTour(tour._id)}
//                                                         className="text-green-600 hover:text-green-900 flex items-center gap-1"
//                                                         title="Accept Tour"
//                                                     >
//                                                         <FaCheckCircle className="mr-1" /> Accept
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleRejectTour(tour._id)}
//                                                         className="text-red-600 hover:text-red-900 ml-2 flex items-center gap-1"
//                                                         title="Reject Tour"
//                                                     >
//                                                         <FaTimesCircle className="mr-1" /> Reject
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Box/Column Style for Smaller Displays (up to md) */}
//                     <div className="md:hidden space-y-4">
//                         {assignedTours.map((tour) => (
//                             <div key={tour._id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
//                                 <h3 className="text-lg font-semibold text-primary mb-2">{tour.packageName}</h3>
//                                 <p className="text-gray-700 text-sm mb-1"><strong>Tourist:</strong> {tour.touristName}</p>
//                                 <p className="text-gray-700 text-sm mb-1"><strong>Booking Date:</strong> {new Date(tour.bookingDate).toLocaleDateString()}</p>
//                                 <p className="text-gray-700 text-sm mb-1"><strong>Tour Date:</strong> {new Date(tour.tourDate).toLocaleDateString()}</p>
//                                 <p className="text-gray-700 text-sm mb-3"><strong>Price:</strong> ${tour.price}</p>
//                                 <p className="text-gray-700 text-sm mb-3">
//                                     <strong>Status:</strong>
//                                     <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                                         ${tour.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
//                                         ${tour.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
//                                         ${tour.status === 'rejected' || tour.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
//                                     `}>
//                                         {tour.status}
//                                     </span>
//                                 </p>
//                                 {tour.status === 'pending' && (
//                                     <div className="flex flex-wrap gap-2 mt-3">
//                                         <button
//                                             onClick={() => handleAcceptTour(tour._id)}
//                                             className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
//                                         >
//                                             <FaCheckCircle /> Accept
//                                         </button>
//                                         <button
//                                             onClick={() => handleRejectTour(tour._id)}
//                                             className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
//                                         >
//                                             <FaTimesCircle /> Reject
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default MyAssignedTours;
import React from 'react';

const MyAssignedTours = () => {
    return (
        <div>
            
        </div>
    );
};

export default MyAssignedTours;