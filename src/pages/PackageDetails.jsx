import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from 'react-hot-toast'; 
import { AuthContext } from '../providers/AuthContext'; 
import useAxiosSecure from '../../src/hooks/useAxiosSecure'; 

const PackageDetails = () => {
    const { id } = useParams(); 
    const { user, logOut } = useContext(AuthContext); 
    const axiosSecure = useAxiosSecure(); 


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGuideId, setSelectedGuideId] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false); 


    const { data: packageDetails, isLoading: packageLoading, isError: packageError, error: packageFetchError } = useQuery({
        queryKey: ['packageDetails', id],
        queryFn: async () => {
            if (!id) throw new Error('Package ID is missing');
            const response = await axios.get(`https://tour-system-server.vercel.app/packages/${id}`);
            return response.data;
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
    });


    const { data: tourGuidesForPackage, isLoading: guidesLoading, isError: guidesError, error: guidesFetchError } = useQuery({
        queryKey: ['tourGuidesForPackage', id, packageDetails?.tourGuides],
        queryFn: async () => {
            if (!packageDetails || !packageDetails.tourGuides || packageDetails.tourGuides.length === 0) {
                return [];
            }
            const guidePromises = packageDetails.tourGuides.map(guideId =>
                axios.get(`https://tour-system-server.vercel.app/tour-guides/${guideId}`)
            );
            const responses = await Promise.all(guidePromises);
            return responses.map(res => res.data);
        },
        enabled: !!packageDetails && packageDetails.tourGuides && packageDetails.tourGuides.length > 0,
    });


    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please log in to book a trip.");
            return;
        }

        if (!selectedDate) {
            toast.error("Please select a tour date.");
            return;
        }

        if (!selectedGuideId) {
            toast.error("Please select a tour guide.");
            return;
        }

        if (!packageDetails) {
            toast.error("Package details not loaded. Please try again.");
            return;
        }

        const bookingInfo = {
            packageId: packageDetails._id,
            packageName: packageDetails.tripTitle,
            packageType: packageDetails.tourType,
            packagePrice: packageDetails.price,
            tourDate: selectedDate.toISOString(), 
            tourGuideId: selectedGuideId,
            tourGuideEmail: tourGuidesForPackage.find(g => g._id === selectedGuideId)?.email, 
            tourGuideName: tourGuidesForPackage.find(g => g._id === selectedGuideId)?.name, 
            userEmail: user.email, 
            userName: user.displayName, 
            userPhoto: user.photoURL, 
            status: 'pending', 
        };

        try {
            const res = await axiosSecure.post('https://tour-system-server.vercel.app/bookings', bookingInfo);

            if (res.data.bookingId) {
                toast.success("Tour booked successfully!");
                setSelectedDate(null); 
                setSelectedGuideId(''); 
                setBookingSuccess(true); 
            } else {
                toast.error("Failed to book tour. Please try again.");
            }
        } catch (error) {
            console.error("Booking error:", error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                toast.error("Unauthorized access. Please log in again.");
                await logOut(); 
            } else if (error.response?.status === 409) { 
                toast.error(error.response.data.message);
            }
            else if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred during booking.");
            }
        }
    };

    if (packageLoading || guidesLoading) {
        return <div className="text-center py-16 text-2xl font-semibold text-gray-700">Loading package details...</div>;
    }

    if (packageError) {
        console.error("Error fetching package:", packageFetchError);
        return <div className="text-center py-16 text-2xl font-bold text-red-600">Error loading package: {packageFetchError.message}</div>;
    }

    if (!packageDetails) {
        return <div className="text-center py-16 text-2xl text-gray-500">Package not found.</div>;
    }

    const {
        image,
        images,
        tripTitle,
        tourType,
        price,
        description,
        tourPlan,
    } = packageDetails;

    return (
        <div className="container mx-auto px-4 py-12">
            <Toaster /> 
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
                        {images.map((imgSrc, index) => (
                            <img key={index} src={imgSrc} alt={`${tripTitle} image ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
                        ))}
                    </div>
                ) : (
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
                </div>
            </div>

            {/* Tour Plan / Itinerary Section */}
            {tourPlan && tourPlan.length > 0 && (
                <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Tour Plan</h2>
                    {tourPlan.map((plan, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                            <h3 className="text-2xl font-semibold text-[#FF9494] mb-2">Day {index + 1}: {plan.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{plan.description}</p>
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
            {(!tourGuidesForPackage || tourGuidesForPackage.length === 0) && !guidesLoading && !guidesError && (
                <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Guides for This Tour</h2>
                    <p className="text-gray-700 text-center">No dedicated guides found for this tour yet.</p>
                </div>
            )}

            {/* Booking Form Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Book This Trip</h2>
                {user ? (

                    bookingSuccess ? (
                        <div className="text-center py-10">
                            <h3 className="text-2xl font-semibold text-green-600 mb-4">
                                Your booking for "{tripTitle}" has been successfully placed! 🎉
                            </h3>
                            <p className="text-gray-700 mb-6">
                                You can view the details and manage your bookings in your dashboard.
                            </p>
                            <Link
                                to="/dashboard/tourist/bookings" // Link to "My Bookings" route
                                className="bg-[#FF9494] hover:bg-[#FF7F7F] text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
                            >
                                Go to My Bookings
                            </Link>
                            {/* Optional: Button to allow booking another trip (resets the success state) */}
                            <button
                                onClick={() => setBookingSuccess(false)}
                                className="ml-4 text-[#FF9494] hover:underline font-semibold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                            >
                                Book another trip
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleBookingSubmit} className="space-y-6">
                            
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Package Name</label>
                                <input
                                    type="text"
                                    value={tripTitle}
                                    readOnly
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName || 'N/A'}
                                    readOnly
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
                                <input
                                    type="email"
                                    value={user?.email || 'N/A'}
                                    readOnly
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                       
                            <input
                                type="hidden"
                                value={user?.photoURL || ''}
                                readOnly
                            />

                      
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                <input
                                    type="text"
                                    value={`$${price}`}
                                    readOnly
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            {/* Tour Date Picker */}
                            <div>
                                <label htmlFor="tourDate" className="block text-gray-700 text-sm font-bold mb-2">Select Tour Date</label>
                                <DatePicker
                                    id="tourDate"
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="MMMM d, yyyy"
                                    minDate={new Date()} 
                                    placeholderText="Click to select a date"
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                                    wrapperClassName="w-full" 
                                />
                            </div>

                            {/* Tour Guide Dropdown */}
                            <div>
                                <label htmlFor="tourGuide" className="block text-gray-700 text-sm font-bold mb-2">Choose Tour Guide</label>
                                <select
                                    id="tourGuide"
                                    value={selectedGuideId}
                                    onChange={(e) => setSelectedGuideId(e.target.value)}
                                    className="shadow border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white cursor-pointer"
                                    required
                                >
                                    <option value="">Select a guide</option>
                                    {tourGuidesForPackage.length > 0 ? (
                                        tourGuidesForPackage.map(guide => (
                                            <option key={guide._id} value={guide._id}>
                                                {guide.name} ({guide.specialization})
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No guides available for this package.</option>
                                    )}
                                </select>
                            </div>

                            {/* Book Now Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#FF9494] hover:bg-[#FF7F7F] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
                            >
                                Book Now
                            </button>
                        </form>
                    )
                ) : (
                    <p className="text-center text-xl text-gray-600 mt-4">
                        Please <Link to="/login" className="text-[#FF9494] hover:underline font-semibold">log in</Link> to book this trip.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PackageDetails;