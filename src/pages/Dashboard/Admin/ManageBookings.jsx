
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageBookings = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: bookings, isLoading, isError, error } = useQuery({
        queryKey: ['allBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings/admin'); 
            return res.data;
        },
        refetchOnWindowFocus: false,
    });


    const updateBookingStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/bookings/status/${id}`, { status });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allBookings']); 
            toast.success("Booking status updated successfully!");
        },
        onError: (mutationError) => {
            console.error("Failed to update booking status:", mutationError);
            toast.error(mutationError.response?.data?.message || "Failed to update booking status.");
        },
    });

    const handleStatusUpdate = (id, newStatus) => {
        updateBookingStatusMutation.mutate({ id, status: newStatus });
    };

    if (isLoading) {
        return <div className="text-center py-10 text-xl text-gray-600">Loading bookings...</div>;
    }

    if (isError) {
        return <div className="text-center py-10 text-xl text-red-600">Error loading bookings: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md min-h-screen">
            <Toaster />
            <h1 className="text-3xl font-bold text-[#FF9494] mb-4">Manage All Bookings</h1> 
            <p className="text-gray-600 mb-8">Review and manage tour bookings made by users.</p>

            {bookings.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No bookings to manage.</div>
            ) : (
                <>
                    <div className="overflow-x-auto hidden md:block rounded-lg border border-gray-200"> 
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Package Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tourist Details
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tour Guide
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tour Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{booking.packageName}</div>
                                            <div className="text-sm text-gray-500">{booking.packageType}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{booking.userName}</div>
                                            <div className="text-sm text-gray-500">{booking.userEmail}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {booking.tourGuideName || 'Assigned Later'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(booking.tourDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${booking.packagePrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                ${booking.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                                                ${booking.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                                                ${booking.status === 'cancelled' ? 'bg-gray-100 text-gray-800' : ''}
                                            `}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            {booking.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking._id, 'approved')}
                                                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-md text-xs font-semibold mr-2 transition duration-150"
                                                        disabled={updateBookingStatusMutation.isPending}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                                                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-xs font-semibold transition duration-150"
                                                        disabled={updateBookingStatusMutation.isPending}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {(booking.status === 'approved' || booking.status === 'pending') && (
                                                <button
                                                    onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                                                    className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded-md text-xs font-semibold ml-2 transition duration-150"
                                                    disabled={updateBookingStatusMutation.isPending}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden space-y-4"> 
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-bold text-[#FF9494]">{booking.packageName}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                        ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                        ${booking.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                                        ${booking.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                                        ${booking.status === 'cancelled' ? 'bg-gray-100 text-gray-800' : ''}
                                    `}>
                                        {booking.status}
                                    </span>
                                </div>
                                <p className="text-gray-700 text-sm mb-1"><span className="font-semibold">Type:</span> {booking.packageType}</p>
                                <p className="text-gray-700 text-sm mb-1"><span className="font-semibold">Tourist:</span> {booking.userName} ({booking.userEmail})</p>
                                <p className="text-gray-700 text-sm mb-1"><span className="font-semibold">Guide:</span> {booking.tourGuideName || 'Assigned Later'}</p>
                                <p className="text-gray-700 text-sm mb-1"><span className="font-semibold">Tour Date:</span> {new Date(booking.tourDate).toLocaleDateString()}</p>
                                <p className="text-gray-700 text-sm mb-4"><span className="font-semibold">Price:</span> ${booking.packagePrice}</p>

                                <div className="flex flex-wrap justify-end gap-2 mt-4">
                                    {booking.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(booking._id, 'approved')}
                                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-semibold transition duration-150 flex-grow sm:flex-grow-0"
                                                disabled={updateBookingStatusMutation.isPending}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-semibold transition duration-150 flex-grow sm:flex-grow-0"
                                                disabled={updateBookingStatusMutation.isPending}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {(booking.status === 'approved' || booking.status === 'pending') && (
                                        <button
                                            onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                                            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm font-semibold transition duration-150 flex-grow sm:flex-grow-0"
                                            disabled={updateBookingStatusMutation.isPending}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageBookings;