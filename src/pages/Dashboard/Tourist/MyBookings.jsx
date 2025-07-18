// import React, { useContext } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';

// import Swal from 'sweetalert2';
// import { AuthContext } from '../../../providers/AuthContext';

// const MyBookings = () => {
//     const { user, loading } = useContext(AuthContext);
//     const queryClient = useQueryClient();

//     // Fetch bookings data
//     const { data: bookings = [], isLoading, isError, error } = useQuery({
//         queryKey: ['myBookings', user?.email], // Query key includes user email for specificity
//         queryFn: async () => {
//             if (!user?.email) {
//                 return []; // Don't fetch if no user email
//             }
//             const token = localStorage.getItem('access-token'); // Get your JWT token
//             const res = await axios.get(`http://localhost:5000/bookings`, { // Adjust URL to your backend
//                 headers: {
//                     authorization: `Bearer ${token}`
//                 }
//             });
//             return res.data;
//         },
//         enabled: !!user?.email && !loading, // Only enable query if user email exists and not loading
//     });

//     // Mutation for cancelling a booking
//     const cancelBookingMutation = useMutation({
//         mutationFn: async (bookingId) => {
//             const token = localStorage.getItem('access-token');
//             const res = await axios.patch(`http://localhost:5000/bookings/${bookingId}/cancel`, {}, { // Adjust URL
//                 headers: {
//                     authorization: `Bearer ${token}`
//                 }
//             });
//             return res.data;
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries(['myBookings', user?.email]); // Invalidate to refetch bookings
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Booking Cancelled!',
//                 text: 'Your booking has been successfully cancelled.',
//                 confirmButtonText: 'OK',
//             });
//         },
//         onError: (err) => {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Cancellation Failed!',
//                 text: `Could not cancel booking: ${err.response?.data?.message || err.message}`,
//                 confirmButtonText: 'OK',
//             });
//         },
//     });

//     const handleCancelBooking = (bookingId, status) => {
//         if (status === 'pending') {
//             Swal.fire({
//                 title: 'Are you sure?',
//                 text: "You won't be able to revert this!",
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Yes, cancel it!'
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     cancelBookingMutation.mutate(bookingId);
//                 }
//             });
//         } else {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'Cannot Cancel',
//                 text: `Bookings with status "${status}" cannot be cancelled by the user.`,
//                 confirmButtonText: 'OK',
//             });
//         }
//     };

//     if (loading || isLoading) {
//         return (
//             <div className="flex justify-center items-center h-full">
//                 <p>Loading bookings...</p>
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="text-center text-red-500">
//                 <h2 className="text-2xl font-bold mb-4">Error Loading Bookings</h2>
//                 <p>{error.message}</p>
//             </div>
//         );
//     }

//     if (bookings.length === 0) {
//         return (
//             <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto text-center">
//                 <h2 className="text-3xl font-bold text-[#FF5F7F] mb-6">My Bookings</h2>
//                 <p className="text-gray-700">You haven't booked any tours yet.</p>
//                 <p className="text-gray-500 mt-2">Explore our amazing trips and book your next adventure!</p>
//                 {/* You might want to add a link to the trips page here */}
//             </div>
//         );
//     }

//     return (
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
//             <h2 className="text-3xl font-bold text-[#FF5F7F] mb-6 text-center">My Bookings</h2>
//             <p className="text-gray-700 mb-8 text-center">
//                 Here you can view and manage all your booked tour packages.
//             </p>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//                     <thead>
//                         <tr className="bg-[#FF9494] text-white">
//                             <th className="py-3 px-4 text-left border-b">Package Name</th>
//                             <th className="py-3 px-4 text-left border-b">Tour Guide</th>
//                             <th className="py-3 px-4 text-left border-b">Price</th>
//                             <th className="py-3 px-4 text-left border-b">Booking Date</th>
//                             <th className="py-3 px-4 text-left border-b">Status</th>
//                             <th className="py-3 px-4 text-left border-b">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.map((booking) => (
//                             <tr key={booking._id} className="hover:bg-gray-50 border-b">
//                                 <td className="py-3 px-4">{booking.packageName}</td>
//                                 <td className="py-3 px-4">{booking.tourGuideName || 'Assigned Later'}</td>
//                                 <td className="py-3 px-4">${booking.price}</td>
//                                 <td className="py-3 px-4">{booking.bookingDate}</td>
//                                 <td className="py-3 px-4">
//                                     <span
//                                         className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                                             booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                                             booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
//                                             booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                                             'bg-gray-100 text-gray-800'
//                                         }`}
//                                     >
//                                         {booking.status}
//                                     </span>
//                                 </td>
//                                 <td className="py-3 px-4">
//                                     <button
//                                         onClick={() => handleCancelBooking(booking._id, booking.status)}
//                                         className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-200
//                                             ${booking.status === 'pending'
//                                                 ? 'bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
//                                                 : 'bg-gray-400 cursor-not-allowed'
//                                             }`}
//                                         disabled={booking.status !== 'pending'}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default MyBookings;


import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthContext';

const MyBookings = () => {
    const { user, loading } = useContext(AuthContext);
    const queryClient = useQueryClient();

    // Fetch bookings data
    const { data: bookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['myBookings', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }
            // Use the token to authorize the request
            const token = localStorage.getItem('access-token');
            const res = await axios.get(`http://localhost:5000/bookings`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        enabled: !!user?.email && !loading,
    });

    // Mutation for cancelling a booking
    const cancelBookingMutation = useMutation({
        mutationFn: async (bookingId) => {
            const token = localStorage.getItem('access-token');
            const res = await axios.patch(`http://localhost:5000/bookings/${bookingId}/cancel`, {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myBookings', user?.email]);
            Swal.fire({
                icon: 'success',
                title: 'Booking Cancelled!',
                text: 'Your booking has been successfully cancelled.',
                confirmButtonText: 'OK',
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Cancellation Failed!',
                text: `Could not cancel booking: ${err.response?.data?.message || err.message}`,
                confirmButtonText: 'OK',
            });
        },
    });

    const handleCancelBooking = (bookingId, status) => {
        if (status === 'pending') {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    cancelBookingMutation.mutate(bookingId);
                }
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Cannot Cancel',
                text: `Bookings with status "${status}" cannot be cancelled by the user.`,
                confirmButtonText: 'OK',
            });
        }
    };

    if (loading || isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Loading bookings...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500">
                <h2 className="text-2xl font-bold mb-4">Error Loading Bookings</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[#FF5F7F] mb-6">My Bookings</h2>
                <p className="text-gray-700">You haven't booked any tours yet.</p>
                <p className="text-gray-500 mt-2">Explore our amazing trips and book your next adventure!</p>
                {/* You might want to add a link to the trips page here */}
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#FF5F7F] mb-6 text-center">My Bookings</h2>
            <p className="text-gray-700 mb-8 text-center">
                Here you can view and manage all your booked tour packages.
            </p>

            {/* The main table container, hidden on small screens */}
            <div className="overflow-x-auto hidden sm:block"> {/* Only show table on sm and larger screens */}
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-[#FF9494] text-white">
                            <th className="py-3 px-4 text-left border-b">Package Name</th>
                            <th className="py-3 px-4 text-left border-b">Tour Guide</th>
                            <th className="py-3 px-4 text-left border-b">Price</th>
                            <th className="py-3 px-4 text-left border-b">Booking Date</th>
                            <th className="py-3 px-4 text-left border-b">Status</th>
                            <th className="py-3 px-4 text-left border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50 border-b">
                                <td className="py-3 px-4">{booking.packageName}</td>
                                <td className="py-3 px-4">{booking.tourGuideName || 'Assigned Later'}</td>
                                <td className="py-3 px-4">${booking.price}</td>
                                <td className="py-3 px-4">{booking.bookingDate}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleCancelBooking(booking._id, booking.status)}
                                        className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-200
                                            ${booking.status === 'pending'
                                                ? 'bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                                                : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                        disabled={booking.status !== 'pending'}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile / Small screen specific display */}
            <div className="sm:hidden space-y-4"> {/* Only show this section on screens smaller than 'sm' */}
                {bookings.map((booking) => (
                    <div key={booking._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold text-[#FF5F7F]">{booking.packageName}</h3>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}
                            >
                                {booking.status}
                            </span>
                        </div>
                        <p className="text-gray-700"><span className="font-semibold">Guide:</span> {booking.tourGuideName || 'Assigned Later'}</p>
                        <p className="text-gray-700"><span className="font-semibold">Price:</span> ${booking.price}</p>
                        <p className="text-gray-700 mb-4"><span className="font-semibold">Booked On:</span> {booking.bookingDate}</p>
                        <div className="text-right">
                            <button
                                onClick={() => handleCancelBooking(booking._id, booking.status)}
                                className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-200
                                    ${booking.status === 'pending'
                                        ? 'bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                                        : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                                disabled={booking.status !== 'pending'}
                            >
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;


