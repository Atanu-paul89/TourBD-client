
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthContext';
import { updatePassword } from 'firebase/auth'; 
import Swal from 'sweetalert2'; 

const ManageProfileTourist = () => {
    const { user, loading, userUpdateProfile, axiosSecure } = useContext(AuthContext); 
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.displayName || '');
    const [photo, setPhoto] = useState(user?.photoURL || '');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false); 

    React.useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setPhoto(user.photoURL || '');
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-xl font-medium">Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center text-red-500 py-10">
                <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);

        const updates = {};
        const backendUpdates = {}; // Data for backend update

        // Check for name change
        if (name !== user.displayName && name.trim() !== '') {
            updates.displayName = name;
            backendUpdates.displayName = name;
        }

        // Check for photoURL change
        if (photo !== user.photoURL && photo.trim() !== '') {
            updates.photoURL = photo;
            backendUpdates.photoURL = photo;
        }

        // Password change logic
        let passwordUpdated = false;
        if (newPassword.trim() !== '') {
            if (newPassword !== confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Mismatch!',
                    text: 'New password and confirm password do not match.',
                });
                setUpdateLoading(false);
                return;
            }
            if (newPassword.length < 6) {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Too Short!',
                    text: 'Password must be at least 6 characters long.',
                });
                setUpdateLoading(false);
                return;
            }
            try {
                // Firebase updatePassword requires re-authentication if too much time has passed.
                // For simplicity here, we assume the session is fresh enough.
                // In a real app, you'd handle re-authentication if this fails.
                await updatePassword(user, newPassword);
                passwordUpdated = true;
                console.log("Firebase password updated successfully!");
            } catch (error) {
                console.error("Error updating Firebase password:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Password Update Failed!',
                    text: `Could not update password. Please try logging out and in again, then retry. Error: ${error.message}`,
                });
                setUpdateLoading(false);
                return;
            }
        }

        let firebaseProfileUpdated = false;
        // Update Firebase profile (displayName, photoURL)
        if (Object.keys(updates).length > 0) {
            try {
                await userUpdateProfile(updates.displayName || user.displayName, updates.photoURL || user.photoURL);
                firebaseProfileUpdated = true;
                console.log("Firebase profile updated successfully!");
            } catch (error) {
                console.error("Error updating Firebase profile:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Profile Update Failed!',
                    text: `Could not update profile in Firebase: ${error.message}`,
                });
                setUpdateLoading(false);
                return;
            }
        }

        let backendProfileUpdated = false;
        // Update backend MongoDB profile (displayName, photoURL) using axiosSecure
        if (Object.keys(backendUpdates).length > 0 && axiosSecure) {
            try {
                const response = await axiosSecure.patch(`/users/${user.email}`, backendUpdates);
                console.log("Backend profile update response:", response.data);
                backendProfileUpdated = true;
            } catch (error) {
                console.error("Error updating backend profile:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Backend Update Failed!',
                    text: `Could not update profile in backend: ${error.response?.data?.message || error.message}`,
                });
                setUpdateLoading(false);
                return;
            }
        }

        // Show success message if at least one update occurred
        if (firebaseProfileUpdated || backendProfileUpdated || passwordUpdated) {
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been successfully updated.',
            });
            setIsEditing(false); // Exit edit mode on success
            setNewPassword(''); // Clear password fields
            setConfirmPassword('');
        } else {
            Swal.fire({
                icon: 'info',
                title: 'No Changes',
                text: 'No changes were made to your profile.',
            });
        }
        setUpdateLoading(false);
    };


    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#FF5F7F] mb-6 text-center">My Profile</h2>
            <p className="text-gray-700 mb-4 text-center">
                This page displays your personal profile information.
            </p>

            <div className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                    {user.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="User Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-[#FF9494] shadow-lg"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-5xl font-bold">
                            {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'N/A'}
                        </div>
                    )}
                </div>

                {!isEditing ? (
                    <>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label className="font-semibold text-gray-700 w-1/3">Name:</label>
                            <span className="text-gray-800 w-2/3">{user.displayName || 'Not Set'}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label className="font-semibold text-gray-700 w-1/3">Email:</label>
                            <span className="text-gray-800 w-2/3">{user.email}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label className="font-semibold text-gray-700 w-1/3">Role:</label>
                            <span className="text-gray-800 w-2/3">
                                {user.role ? user.role.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Tourist (Default)'}
                            </span>
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
                                className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-[#FF9494]"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label htmlFor="photo" className="font-semibold text-gray-700 w-1/3">Photo URL:</label>
                            <input
                                type="text"
                                id="photo"
                                className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-[#FF9494]"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label htmlFor="email" className="font-semibold text-gray-700 w-1/3">Email:</label>
                            {/* Email is typically not editable from client-side for Firebase users directly */}
                            <span className="text-gray-800 w-2/3 bg-gray-100 px-3 py-2 rounded-md">{user.email} (Not Editable)</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label htmlFor="newPassword" className="font-semibold text-gray-700 w-1/3">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-[#FF9494]"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Leave blank to keep current password"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                            <label htmlFor="confirmPassword" className="font-semibold text-gray-700 w-1/3">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-[#FF9494]"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                            />
                        </div>

                        <div className="text-center mt-6 flex justify-center gap-4">
                            <button
                                type="submit"
                                className="bg-[#FF5F7F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF9494] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF5F7F] focus:ring-opacity-50"
                                disabled={updateLoading} // Disable button during update
                            >
                                {updateLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false); // Cancel edit mode
                                    setName(user.displayName || ''); // Reset fields to current user data
                                    setPhoto(user.photoURL || '');
                                    setNewPassword('');
                                    setConfirmPassword('');
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

export default ManageProfileTourist;