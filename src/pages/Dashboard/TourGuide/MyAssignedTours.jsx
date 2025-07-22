import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../providers/AuthContext'; 
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa'; 

const MyAssignedTours = () => {
    const { user, loading, axiosSecure } = useContext(AuthContext);
    const [assignedTours, setAssignedTours] = useState([]);
    const [toursLoading, setToursLoading] = useState(true);

    useEffect(() => {
        const fetchAssignedTours = async () => {
            if (user?.email && axiosSecure) {
                try {
                    setToursLoading(true);
                    const response = await axiosSecure.get(`/bookings/guide/${user.email}?status=accepted`);
                    setAssignedTours(response.data);
                } catch (error) {
                    console.error("Error fetching assigned tours:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Fetch Failed!',
                        text: `Could not load assigned tours: ${error.response?.data?.message || error.message}`,
                    });
                    setAssignedTours([]);
                } finally {
                    setToursLoading(false);
                }
            } else {
                setToursLoading(false);
            }
        };

        if (!loading && user) {
            fetchAssignedTours();
        }
    }, [user, loading, axiosSecure]);

    if (loading || toursLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-xl font-medium">Loading assigned tours...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center text-red-500 py-10">
                <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                <p>Please log in to view your assigned tours.</p>
            </div>
        );
    }

    if (assignedTours.length === 0) {
        return (
            <div className="text-center text-gray-600 py-10">
                <h2 className="text-2xl font-bold mb-4">No Assigned Tours Yet!</h2>
                <p>It looks like you haven't been assigned any tours yet. Please check back later.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#FF5F7F] mb-6 text-center">My Assigned Tours</h2>
            <p className="text-gray-700 mb-6 text-center">
                Here you can see the tours assigned to you by the admin.
            </p>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-[#FF9494] text-white">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold">Tour Package</th>
                            <th className="py-3 px-4 text-left font-semibold">Tourist Name</th>
                            <th className="py-3 px-4 text-left font-semibold">Booking Date</th>
                            <th className="py-3 px-4 text-left font-semibold">Price</th>
                            <th className="py-3 px-4 text-left font-semibold">Status</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                        {assignedTours.map((tour) => (
                            <tr key={tour._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4">{tour.packageName}</td>
                                <td className="py-3 px-4">{tour.touristName}</td>
                                <td className="py-3 px-4">{new Date(tour.bookingDate).toLocaleDateString()}</td>
                                <td className="py-3 px-4">${tour.price}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        tour.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        tour.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {tour.status}
                                    </span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssignedTours;