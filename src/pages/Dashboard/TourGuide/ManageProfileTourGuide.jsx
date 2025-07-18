// // src/components/ManageProfileTourGuide.jsx
// import React, { useEffect, useState } from 'react';

// const ManageProfileTourGuide = ({ user, axiosSecure, onProfileUpdate }) => {
//     const [guideProfile, setGuideProfile] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         displayName: '',
//         photoURL: '',
//         bio: '',
//         // Add other guide-specific fields here if you have them, e.g., phoneNumber, languages
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [submitLoading, setSubmitLoading] = useState(false);

//     useEffect(() => {
//         const fetchGuideProfile = async () => {
//             // Check if user or axiosSecure are not yet available or user email is missing
//             if (!user?.email || !axiosSecure) {
//                 console.warn("ManageProfileTourGuide: User email or axiosSecure not available yet. User:", user, "AxiosSecure:", axiosSecure);
//                 setLoading(false); // Stop loading, as we can't proceed
//                 setError("Please log in as a tour guide to view your profile."); // More informative message
//                 return;
//             }

//             try {
//                 setLoading(true);
//                 // Ensure the backend endpoint is `/users/email/:email`
//                 const response = await axiosSecure.get(`/users/email/${user.email}`);
//                 const fetchedProfile = response.data;

//                 setGuideProfile(fetchedProfile);
//                 setFormData({
//                     displayName: fetchedProfile.displayName || fetchedProfile.name || '',
//                     photoURL: fetchedProfile.photoURL || '',
//                     bio: fetchedProfile.bio || '',
//                 });
//                 setError(null);
//             } catch (err) {
//                 console.error("Error fetching guide profile:", err);
//                 if (err.response) {
//                     // Log the full error response from the server for debugging
//                     console.error("Backend response error:", err.response.data);
//                     setError(`Failed to load profile: ${err.response.data.message || err.response.statusText}`);
//                 } else if (err.request) {
//                     // The request was made but no response was received
//                     setError("No response from server. Please check your backend.");
//                 } else {
//                     // Something happened in setting up the request that triggered an Error
//                     setError(`Error during request setup: ${err.message}`);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchGuideProfile();
//     }, [user, axiosSecure]); // Depend on user and axiosSecure props

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitLoading(true);
//         setError(null);

//         if (!axiosSecure || !user?.email) {
//             setError("Authentication error: Cannot submit profile update.");
//             setSubmitLoading(false);
//             return;
//         }

//         try {
//             const dataToUpdate = {};
//             if (formData.displayName !== (guideProfile.displayName || guideProfile.name)) {
//                 dataToUpdate.displayName = formData.displayName;
//             }
//             if (formData.photoURL !== guideProfile.photoURL) {
//                 dataToUpdate.photoURL = formData.photoURL;
//             }
//             if (formData.bio !== guideProfile.bio) {
//                 dataToUpdate.bio = formData.bio;
//             }

//             if (Object.keys(dataToUpdate).length === 0) {
//                 alert("No changes to save.");
//                 setIsEditing(false);
//                 setSubmitLoading(false);
//                 return;
//             }

//             const response = await axiosSecure.patch(`/users/${user.email}`, dataToUpdate);

//             setGuideProfile(prev => ({ ...prev, ...dataToUpdate }));

//             if (onProfileUpdate) {
//                 onProfileUpdate(dataToUpdate);
//             }

//             alert("Profile updated successfully!");
//             setIsEditing(false);
//         } catch (err) {
//             console.error("Error updating profile:", err);
//             setError("Failed to update profile: " + (err.response?.data?.message || err.message || "An unknown error occurred."));
//         } finally {
//             setSubmitLoading(false);
//         }
//     };

//     if (loading) {
//         return <div className="text-center py-10 text-lg font-medium">Loading profile...</div>;
//     }

//     if (error) {
//         return <div className="text-center py-10 text-red-500 text-lg">{error}</div>;
//     }

//     if (!guideProfile) {
//         return <div className="text-center py-10 text-gray-600 text-lg">Profile data not available for your account.</div>;
//     }

//     return (
//         <div className="p-4 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
//             <h1 className="text-3xl font-bold text-[#FF9494] mb-6 text-center">Tour Guide: Manage My Profile</h1>

//             {!isEditing ? (
//                 <div className="space-y-4">
//                     <div className="flex flex-col items-center">
//                         <img
//                             src={guideProfile.photoURL || 'https://via.placeholder.com/150'}
//                             alt="Profile"
//                             className="w-32 h-32 rounded-full object-cover border-4 border-[#FF9494] mb-4"
//                         />
//                         <h2 className="text-2xl font-semibold text-gray-800">{guideProfile.displayName || guideProfile.name}</h2>
//                         <p className="text-gray-600">{guideProfile.email}</p>
//                         <p className="text-gray-600 capitalize">Role: <span className="font-medium text-[#FF9494]">{guideProfile.role || 'N/A'}</span></p>
//                     </div>
//                     {guideProfile.bio && (
//                         <div className="text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-200">
//                             <h3 className="font-semibold mb-2">About Me:</h3>
//                             <p>{guideProfile.bio}</p>
//                         </div>
//                     )}
//                     <button
//                         onClick={() => setIsEditing(true)}
//                         className="w-full bg-[#FF9494] text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-[#FF9494] focus:ring-opacity-75 transition duration-200 mt-6"
//                     >
//                         Edit Profile
//                     </button>
//                 </div>
//             ) : (
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label htmlFor="displayName" className="block text-gray-700 text-sm font-bold mb-2">
//                             Display Name
//                         </label>
//                         <input
//                             type="text"
//                             id="displayName"
//                             name="displayName"
//                             value={formData.displayName}
//                             onChange={handleChange}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="photoURL" className="block text-gray-700 text-sm font-bold mb-2">
//                             Photo URL
//                         </label>
//                         <input
//                             type="url"
//                             id="photoURL"
//                             name="photoURL"
//                             value={formData.photoURL}
//                             onChange={handleChange}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
//                             Bio / About Me
//                         </label>
//                         <textarea
//                             id="bio"
//                             name="bio"
//                             value={formData.bio}
//                             onChange={handleChange}
//                             rows="4"
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
//                             placeholder="Tell tourists a little about yourself and your experience."
//                         ></textarea>
//                     </div>
//                     <div className="flex gap-4 mt-6">
//                         <button
//                             type="submit"
//                             className="flex-1 bg-[#FF9494] text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-[#FF9494] focus:ring-opacity-75 transition duration-200"
//                             disabled={submitLoading}
//                         >
//                             {submitLoading ? 'Saving...' : 'Save Changes'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 setIsEditing(false);
//                                 setFormData({
//                                     displayName: guideProfile.displayName || guideProfile.name || '',
//                                     photoURL: guideProfile.photoURL || '',
//                                     bio: guideProfile.bio || '',
//                                 });
//                             }}
//                             className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200"
//                             disabled={submitLoading}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default ManageProfileTourGuide;
import React from 'react';

const ManageProfileTourGuide = () => {
  return (
    <div>
      
    </div>
  );
};

export default ManageProfileTourGuide;