

// src/components/ManageProfileTourGuide.jsx
import React, { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const ManageProfileTourGuide = () => {
    const { user, loading } = useContext(AuthContext); // Get axiosSecure
    const axiosSecure = useAxiosSecure();
    
    const [guideExtraProfile, setGuideExtraProfile] = useState(null); // For guide-specific fields (experience, bio)
    const [extraProfileLoading, setExtraProfileLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName || user?.name || '', // Initialize with user.displayName or user.name from AuthContext
        photoURL: user?.photoURL || '',
        experience: user?.experience || '', // These will be fetched from tourGuidesCollection
        bio: ''        // These will be fetched from tourGuidesCollection
    });
    const [updateLoading, setUpdateLoading] = useState(false);

    // Effect to fetch additional guide-specific profile data (experience, bio)
    useEffect(() => {
        const fetchExtraGuideProfile = async () => {
            if (user?.email && axiosSecure) {
                try {
                    setExtraProfileLoading(true);
                    // This endpoint needs to fetch from the tourGuidesCollection by email.
                    // If your backend doesn't have /tour-guides/email/:email, this will fail.
                    // Based on your network tab, /users/email/:email works.
                    // Let's assume for now you will add /tour-guides/email/:email to backend.
                    const response = await axiosSecure.get(`/tour-guides/email/${user.email}`);
                    setGuideExtraProfile(response.data);
                    setFormData(prev => ({
                        ...prev,
                        name: response.data.name || user.displayName || user.name || '', // Use data from tourGuidesCollection if available
                        photoURL: response.data.photoURL || user.photoURL || '',
                        experience: response.data.experience || '',
                        bio: response.data.bio || ''
                    }));
                } catch (error) {
                    console.error("Error fetching extra tour guide profile data:", error);
                    // It's okay if this specific endpoint isn't found if guide-specific data isn't critical
                    // We will still display basic profile from `user` object.
                    setGuideExtraProfile(null); // Clear extra profile data on error
                } finally {
                    setExtraProfileLoading(false);
                }
            } else {
                setExtraProfileLoading(false);
            }
        };

        if (!loading && user) { // Only attempt to fetch if AuthContext is done loading and user is present
            fetchExtraGuideProfile();
        }
    }, [user, loading, axiosSecure]); // Re-run when user, loading, or axiosSecure changes

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    // Simplified and corrected `handleUpdateProfile` in ManageProfileTourGuide.jsx
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);

        try {
            if (!user?.email || !axiosSecure) {
                throw new Error("User email or API client is not available.");
            }

            const updatesToFirebase = {}; // For Firebase displayName, photoURL
            const updatesToUsersCollection = {}; // For backend /users/:email patch
            const updatesToTourGuidesCollection = {}; // For backend /tour-guides/:email patch (experience, bio, potentially name/photoURL)

            let anyChangesDetected = false;

            // Compare and prepare updates for Firebase and backend's usersCollection/tourGuidesCollection
            // Name and Photo URL (can be updated in Firebase, usersCollection, and tourGuidesCollection)
            if (formData.name !== (user.displayName || user.name || guideExtraProfile?.name || '')) {
                updatesToFirebase.displayName = formData.name;
                updatesToUsersCollection.displayName = formData.name;
                updatesToTourGuidesCollection.name = formData.name;
                anyChangesDetected = true;
            }
            if (formData.photoURL !== (user.photoURL || guideExtraProfile?.photoURL || '')) {
                updatesToFirebase.photoURL = formData.photoURL;
                updatesToUsersCollection.photoURL = formData.photoURL;
                updatesToTourGuidesCollection.photoURL = formData.photoURL;
                anyChangesDetected = true;
            }

            // Experience and Bio (specific to tourGuidesCollection)
            // Only compare if guideExtraProfile was successfully loaded, otherwise just send the formData value
            if (guideExtraProfile) {
                if (formData.experience !== guideExtraProfile.experience) {
                    updatesToTourGuidesCollection.experience = formData.experience;
                    anyChangesDetected = true;
                }
                if (formData.bio !== guideExtraProfile.bio) {
                    updatesToTourGuidesCollection.bio = formData.bio;
                    anyChangesDetected = true;
                }
            } else {
                // If guideExtraProfile wasn't loaded (e.g., it didn't exist before),
                // and formData has values for experience/bio, include them.
                if (formData.experience) {
                    updatesToTourGuidesCollection.experience = formData.experience;
                    anyChangesDetected = true;
                }
                if (formData.bio) {
                    updatesToTourGuidesCollection.bio = formData.bio;
                    anyChangesDetected = true;
                }
            }

            if (!anyChangesDetected) {
                Swal.fire({
                    icon: 'info',
                    title: 'No Changes',
                    text: 'No changes were made to your profile.',
                });
                setIsEditing(false);
                setUpdateLoading(false);
                return;
            }

            // Execute updates
            // 1. Update Firebase (for immediate UI reflection of displayName/photoURL)
            if (Object.keys(updatesToFirebase).length > 0) {
                await user.updateProfile(updatesToFirebase);
            }

            // 2. Update usersCollection in backend
            if (Object.keys(updatesToUsersCollection).length > 0) {
                await axiosSecure.patch(`/users/${user.email}`, updatesToUsersCollection);
            }

            // 3. Update tourGuidesCollection in backend
            if (Object.keys(updatesToTourGuidesCollection).length > 0) {
                // This is the primary PATCH for guide-specific data
                const response = await axiosSecure.patch(`/tour-guides/${user.email}`, updatesToTourGuidesCollection);
                // Check response from tour-guides patch
                if (response.data.modifiedCount === 0 && response.data.message === "No changes made to the tour guide profile.") {
                    // It's possible that only Firebase/usersCollection was updated, or all changes were identical
                } else if (response.data.modifiedCount === 0 && response.data.message !== "No changes made to the tour guide profile.") {
                    throw new Error(response.data.message || "Failed to update tour guide profile.");
                }
            }


            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your tour guide profile has been successfully updated.',
            });
            setIsEditing(false);

            // Re-fetch extra profile data to ensure UI is in sync with latest backend data
            if (user?.email && axiosSecure) {
                const updatedProfileResponse = await axiosSecure.get(`/tour-guides/email/${user.email}`);
                setGuideExtraProfile(updatedProfileResponse.data);
                // Also re-set formData based on the newly fetched data
                setFormData(prev => ({
                    ...prev,
                    name: updatedProfileResponse.data.name || user.displayName || user.name || '',
                    photoURL: updatedProfileResponse.data.photoURL || user.photoURL || '',
                    experience: updatedProfileResponse.data.experience || '',
                    bio: updatedProfileResponse.data.bio || ''
                }));
            }

        } catch (error) {
            console.error("Error updating tour guide profile:", error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed!',
                text: `Could not update profile: ${error.response?.data?.message || error.message}`,
            });
        } finally {
            setUpdateLoading(false);
        }
    };


    if (loading || extraProfileLoading) { // Check both AuthContext loading and extra profile data loading
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-xl font-medium">Loading tour guide profile...</p>
            </div>
        );
    }

    // If AuthContext user is not available, or it's a guide but no profile found (and not loading)
    if (!user || user.role !== 'tour_guide') {
        return (
            <div className="text-center text-red-500 py-10">
                <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                <p>Please ensure you are logged in as a tour guide.</p>
            </div>
        );
    }

    // Combine user data from AuthContext and extra guide data
    const currentProfile = {
        name: user.displayName || user.name || guideExtraProfile?.name || 'Not Set',
        email: user.email || 'Not Set',
        photoURL: user.photoURL || guideExtraProfile?.photoURL || 'https://via.placeholder.com/150',
        role: user.role ? user.role.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'N/A',
        experience: guideExtraProfile?.experience || 'Not Set',
        bio: guideExtraProfile?.bio || 'Not Set'
    };


    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#FF5F7F] mb-6 text-center">My Tour Guide Profile</h2>
            <p className="text-gray-700 mb-4 text-center">
                This page displays your specific tour guide information and allows you to update it.
            </p>

            <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                    <img
                        src={currentProfile.photoURL}
                        alt="Tour Guide Profile"
                        className="w-36 h-36 rounded-full object-cover border-4 border-[#FF9494] shadow-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} // Fallback for broken image
                    />
                </div>

                {!isEditing ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <label className="font-semibold text-gray-700 block mb-1">Name:</label>
                                <span className="text-gray-800">{currentProfile.name}</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <label className="font-semibold text-gray-700 block mb-1">Email:</label>
                                <span className="text-gray-800">{currentProfile.email}</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <label className="font-semibold text-gray-700 block mb-1">Photo URL:</label>
                                <span className="text-gray-800 break-words">{currentProfile.photoURL}</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <label className="font-semibold text-gray-700 block mb-1">Experience:</label>
                                <span className="text-gray-800">{currentProfile.experience ? `${currentProfile.experience} Years` : 'Not Set'}</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg col-span-1 md:col-span-2">
                                <label className="font-semibold text-gray-700 block mb-1">Bio:</label>
                                <p className="text-gray-800 whitespace-pre-wrap">{currentProfile.bio}</p>
                            </div>
                        </div>

                        <div className="text-center mt-6">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-[#FF9494] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF5F7F] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF9494] focus:ring-opacity-50"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label htmlFor="name" className="font-semibold text-gray-700 w-1/3">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-[#FF9494]"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label htmlFor="photoURL" className="font-semibold text-gray-700 w-1/3">Photo URL:</label>
                            <input
                                type="text"
                                id="photoURL"
                                name="photoURL"
                                className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-[#FF9494]"
                                value={formData.photoURL}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label htmlFor="experience" className="font-semibold text-gray-700 w-1/3">Experience (Years):</label>
                            <input
                                type="number"
                                id="experience"
                                name="experience"
                                className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-[#FF9494]"
                                value={formData.experience}
                                onChange={handleInputChange}
                                min="0"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label htmlFor="bio" className="font-semibold text-gray-700 w-1/3">Bio:</label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows="4"
                                className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-[#FF9494]"
                                value={formData.bio}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <div className="text-center mt-6 flex justify-center gap-4">
                            <button
                                type="submit"
                                className="bg-[#FF5F7F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF9494] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF5F7F] focus:ring-opacity-50"
                                disabled={updateLoading}
                            >
                                {updateLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    // Reset form data to current profile data (from user and extra profile)
                                    setFormData({
                                        name: user.displayName || user.name || guideExtraProfile?.name || '',
                                        photoURL: user.photoURL || guideExtraProfile?.photoURL || '',
                                        experience: guideExtraProfile?.experience || '',
                                        bio: guideExtraProfile?.bio || ''
                                    });
                                    setUpdateLoading(false);
                                }}
                                className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                                disabled={updateLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ManageProfileTourGuide;