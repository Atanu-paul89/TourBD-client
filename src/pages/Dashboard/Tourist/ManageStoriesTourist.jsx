// import React, { useContext } from 'react';

// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../../providers/AuthContext';
// import { Navigate, useNavigate } from 'react-router';

// const ManageStoriesTourist = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   const { data: myStories = [], isLoading, isError, refetch } = useQuery({
//     queryKey: ['myStories', user?.email], // Query key dependent on user email
//     queryFn: async () => {
//       if (!user?.email) {
//         return []; // Don't fetch if email is not available
//       }
//       // Use axiosSecure for authenticated request to fetch user-specific stories
//       const res = await axiosSecure.get(`/stories/my-stories?email=${user.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email, // Only run the query if user.email exists
//   });

//   // Handle Delete Story
//   const handleDeleteStory = async (storyId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           // Use axiosSecure for authenticated delete request
//           const res = await axiosSecure.delete(`/stories/${storyId}`);
//           // MongoDB deleteOne returns an object with `deletedCount`
//           if (res.data.deletedCount > 0) {
//             refetch(); // Refresh stories after successful deletion
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your story has been deleted.",
//               icon: "success"
//             });
//           } else {
//             // Handle case where no document was deleted (e.g., already deleted or not found)
//             Swal.fire({
//               title: "Failed!",
//               text: "Story not found or already deleted.",
//               icon: "error"
//             });
//           }
//         } catch (error) {
//           console.error("Error deleting story:", error);
//           // Check if error response has a message from the server
//           const errorMessage = error.response?.data?.message || "Failed to delete story. Please try again.";
//           Swal.fire({
//             title: "Error!",
//             text: errorMessage,
//             icon: "error"
//           });
//         }
//       }
//     });
//   };

//   if (isLoading) {
//     return <div className="text-center py-8 text-lg font-medium">Loading your stories...</div>;
//   }

//   if (isError) {
//     return <div className="text-center py-8 text-xl font-bold text-red-600">Error loading your stories. Please try again later.</div>;
//   }

//   return (
//     <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen rounded-lg shadow-sm">
//       {/* Removed <Helmet> tag */}
//       <h2 className="text-2xl sm:text-3xl font-bold text-center text-rose-500 mb-6 sm:mb-8">My Stories</h2>
//       <p className="text-center text-gray-700 mb-8 sm:mb-10 text-base sm:text-lg">
//         Here you can view, edit, and delete the stories you've shared with the community.
//       </p>

//       {myStories.length === 0 ? (
//         <div className="text-center text-gray-500 text-xl sm:text-2xl py-10">
//           You haven't submitted any stories yet. Share your travel experiences!
//         </div>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//           <table className="table w-full border-collapse">
//             {/* Table head */}
//             <thead>
//               <tr className="bg-rose-100 text-rose-700 text-sm sm:text-base">
//                 <th className="py-3 px-2 sm:px-4 text-left rounded-tl-lg">#</th>
//                 <th className="py-3 px-2 sm:px-4 text-left">Story Title</th>
//                 <th className="py-3 px-2 sm:px-4 text-left">Status</th>
//                 <th className="py-3 px-2 sm:px-4 text-left">Date Submitted</th>
//                 <th className="py-3 px-2 sm:px-4 text-center rounded-tr-lg">Actions</th> {/* Centered actions header */}
//               </tr>
//             </thead>
//             <tbody>
//               {myStories.map((story, index) => (
//                 <tr key={story._id} className="border-b border-gray-100 hover:bg-rose-50 text-sm sm:text-base">
//                   <td className="py-3 px-2 sm:px-4">{index + 1}</td>
//                   <td className="py-3 px-2 sm:px-4 font-semibold text-gray-800">{story.title}</td>
//                   <td className="py-3 px-2 sm:px-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium 
//                                             ${story.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                         story.status === 'published' ? 'bg-green-100 text-green-800' :
//                           'bg-gray-100 text-gray-800'}`}>
//                       {story.status.charAt(0).toUpperCase() + story.status.slice(1)} {/* Capitalize first letter */}
//                     </span>
//                   </td>
//                   <td className="py-3 px-2 sm:px-4 text-gray-600">
//                     {new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} {/* Formatted date */}
//                   </td>
//                   <td className="py-3 px-2 sm:px-4 text-center">
//                     <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
//                       {/* Edit Button */}
//                       <button
//                         className="btn btn-sm btn-outline btn-info text-xs sm:text-sm"
//                         // onClick={() => Swal.fire({
//                         //     icon: 'info',
//                         //     title: "Coming Soon!",
//                         //     text: "Edit functionality for stories is under development.",
//                         //     confirmButtonText: 'Got it!'
//                         // })}

//                         onClick={() => navigate(`/dashboard/tourist/edit-story/${story._id}`)}

//                       >
//                         Edit
//                       </button>
//                       {/* Delete Button */}
//                       <button
//                         className="btn btn-sm btn-outline btn-error text-xs sm:text-sm"
//                         onClick={() => handleDeleteStory(story._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//     </div>
//   );
// };

// export default ManageStoriesTourist;


import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthContext';
import { useNavigate } from 'react-router'; 

const ManageStoriesTourist = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate(); 

    const { data: myStories = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['myStories', user?.email], // Query key dependent on user email
        queryFn: async () => {
            if (!user?.email) {
                return []; // Don't fetch if email is not available
            }
            // Use axiosSecure for authenticated request to fetch user-specific stories
            const res = await axiosSecure.get(`/stories/my-stories?email=${user.email}`);
            console.log("Fetched stories:", res.data);
            return res.data;
        },
        enabled: !!user?.email, // Only run the query if user.email exists
    });

    // Handle Delete Story
    const handleDeleteStory = async (storyId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Use axiosSecure for authenticated delete request
                    const res = await axiosSecure.delete(`/stories/${storyId}`);
                    // MongoDB deleteOne returns an object with `deletedCount`
                    if (res.data.deletedCount > 0) {
                        refetch(); // Refresh stories after successful deletion
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your story has been deleted.",
                            icon: "success"
                        });
                    } else {
                        // Handle case where no document was deleted (e.g., already deleted or not found)
                        Swal.fire({
                            title: "Failed!",
                            text: "Story not found or already deleted.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    console.error("Error deleting story:", error);
                    // Check if error response has a message from the server
                    const errorMessage = error.response?.data?.message || "Failed to delete story. Please try again.";
                    Swal.fire({
                        title: "Error!",
                        text: errorMessage,
                        icon: "error"
                    });
                }
            }
        });
    };

    if (isLoading) {
        return <div className="text-center py-8 text-lg font-medium">Loading your stories...</div>;
    }

    if (isError) {
        return <div className="text-center py-8 text-xl font-bold text-red-600">Error loading your stories. Please try again later.</div>;
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen rounded-lg shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-rose-500 mb-6 sm:mb-8">My Stories</h2>
            <p className="text-center text-gray-700 mb-8 sm:mb-10 text-base sm:text-lg">
                Here you can view, edit, and delete the stories you've shared with the community.
            </p>

            {myStories.length === 0 ? (
                <div className="text-center text-gray-500 text-xl sm:text-2xl py-10">
                    You haven't submitted any stories yet. Share your travel experiences!
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md">
                    {/* Standard table for medium and larger screens */}
                    <div className="overflow-x-auto hidden md:block"> {/* Added hidden md:block to hide on small and show on md+ */}
                        <table className="table w-full border-collapse">
                            {/* Table head */}
                            <thead>
                                <tr className="bg-rose-100 text-rose-700 text-sm sm:text-base">
                                    <th className="py-3 px-2 sm:px-4 text-left rounded-tl-lg">#</th>
                                    <th className="py-3 px-2 sm:px-4 text-left">Story Title</th>
                                    <th className="py-3 px-2 sm:px-4 text-left">Status</th>
                                    <th className="py-3 px-2 sm:px-4 text-left">Date Submitted</th>
                                    <th className="py-3 px-2 sm:px-4 text-center rounded-tr-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myStories.map((story, index) => (
                                    <tr key={story._id} className="border-b border-gray-100 hover:bg-rose-50 text-sm sm:text-base">
                                        <td className="py-3 px-2 sm:px-4">{index + 1}</td>
                                        <td className="py-3 px-2 sm:px-4 font-semibold text-gray-800">{story.title}</td>
                                        <td className="py-3 px-2 sm:px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                                ${story.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                  story.status === 'published' ? 'bg-green-100 text-green-800' :
                                                  'bg-gray-100 text-gray-800'}`}>
                                                {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2 sm:px-4 text-gray-600">
                                            {new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="py-3 px-2 sm:px-4 text-center">
                                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                                                <button
                                                    className="btn btn-sm btn-outline btn-info text-xs sm:text-sm"
                                                    onClick={() => navigate(`/dashboard/tourist/edit-story/${story._id}`)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline btn-error text-xs sm:text-sm"
                                                    onClick={() => handleDeleteStory(story._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card-like display for small screens */}
                    <div className="md:hidden grid grid-cols-1 gap-4 p-4"> {/* Show on small screens, hidden on md+ */}
                        {myStories.map((story, index) => (
                            <div key={story._id} className="bg-white p-4 rounded-lg shadow border border-rose-100">
                                <h3 className="text-lg font-bold text-rose-700 mb-2">{index + 1}. {story.title}</h3>
                                <p className="text-gray-700 mb-1"><span className="font-semibold">Status:</span> 
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium 
                                        ${story.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                          story.status === 'published' ? 'bg-green-100 text-green-800' :
                                          'bg-gray-100 text-gray-800'}`}>
                                        {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                                    </span>
                                </p>
                                <p className="text-gray-700 mb-3"><span className="font-semibold">Date Submitted:</span> {new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        className="btn btn-sm btn-outline btn-info text-xs"
                                        onClick={() => navigate(`/dashboard/tourist/edit-story/${story._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline btn-error text-xs"
                                        onClick={() => handleDeleteStory(story._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStoriesTourist;