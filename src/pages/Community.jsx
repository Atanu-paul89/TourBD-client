// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosPublic from '../../src/hooks/useAxiosPublic';

// const Community = () => {
//     const axiosPublic = useAxiosPublic();
//     // State to manage which stories are expanded
//     const [expandedStories, setExpandedStories] = useState({});

//     const { data: stories = [], isLoading, error } = useQuery({
//         queryKey: ['stories'],
//         queryFn: async () => {
//             const res = await axiosPublic.get('/stories');
//             return res.data;
//         },
//         staleTime: 5 * 60 * 1000,
//         cacheTime: 10 * 60 * 1000,
//     });

//     // Function to toggle story expansion
//     const toggleExpand = (storyId) => {
//         setExpandedStories(prev => ({
//             ...prev,
//             [storyId]: !prev[storyId] // Toggle boolean for specific storyId
//         }));
//     };

//     if (isLoading) {
//         return (
//             <div className="p-8 text-center min-h-screen flex items-center justify-center bg-gray-50">
//                 <p className="text-xl font-semibold text-gray-700">Loading community stories...</p>
//             </div>
//         );
//     }

//     if (error) {
//         console.error("Error fetching stories:", error);
//         return (
//             <div className="p-8 text-center min-h-screen flex items-center justify-center bg-red-50">
//                 <p className="text-xl font-semibold text-red-600">Failed to load stories. Please try again later.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-12  min-h-screen">
//             <header className="text-center mb-12">
//                 <h1 className="text-5xl font-extrabold text-[#FF9494] mb-4 tracking-tight">
//                     Community Stories
//                 </h1>
//                 <p className="text-xl text-gray-700 max-w-2xl mx-auto">
//                     Read inspiring travel stories from our community members.
//                 </p>
//             </header>

//             {stories.length === 0 ? (
//                 <div className="text-center py-20 bg-white rounded-lg shadow-lg">
//                     <p className="text-2xl text-gray-600 font-medium">No stories available yet. Check back later!</p>
//                     <p className="text-md text-gray-400 mt-2">
//                         If you're an admin, ensure stories have 'approved' status in MongoDB.
//                     </p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {stories.map(story => {
//                         const isExpanded = expandedStories[story._id];
//                         // Define character limit for truncated view
//                         const charLimit = 250; 
//                         const isLongStory = story.story.length > charLimit;

//                         return (
//                             <div key={story._id} 
//                                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col">
//                                 <h2 className="text-3xl font-bold text-[#FF9494] mb-4 leading-tight">
//                                     {story.title}
//                                 </h2>

//                                 {/* Story Text with Expand/Collapse */}
//                                 <div className="flex-grow">
//                                     <p className={`text-gray-700 italic text-base leading-relaxed ${!isExpanded && isLongStory ? 'line-clamp-5' : ''}`}>
//                                         {story.story}
//                                     </p>
//                                     {isLongStory && (
//                                         <button 
//                                             onClick={() => toggleExpand(story._id)} 
//                                             className="mt-3 text-[#FF9494] hover:underline font-semibold"
//                                         >
//                                             {isExpanded ? 'Show Less' : 'Read More...'}
//                                         </button>
//                                     )}
//                                 </div>
                                
//                                 {/* Author and Date */}
//                                 <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
//                                     <p className='italic font-bold'>
//                                         By: <span className="font-semibold text-gray-800">{story.author?.name || 'Anonymous'}</span>
//                                     </p>
//                                     <p>
//                                         {new Date(story.date).toLocaleDateString()}
//                                     </p>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Community;


// new code including the pagination // 
// src/pages/Community/Community.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../src/hooks/useAxiosPublic';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const Community = () => {
    const axiosPublic = useAxiosPublic();
    // State to manage which stories are expanded
    const [expandedStories, setExpandedStories] = useState({});

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9); // Display 9 stories per page for a 3x3 grid

    const { data: storiesData, isLoading, error } = useQuery({
        // Add currentPage and itemsPerPage to the queryKey to refetch on page change
        queryKey: ['stories', currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get('/stories', {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                },
            });
            return res.data; // This should now return { stories: [], totalCount: N }
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        keepPreviousData: true, // Keep old data visible while new data loads for a smoother transition
    });

    // Destructure stories and totalCount from the fetched data
    const stories = storiesData?.stories || [];
    const totalStories = storiesData?.totalCount || 0;
    const totalPages = Math.ceil(totalStories / itemsPerPage);

    // Function to toggle story expansion
    const toggleExpand = (storyId) => {
        setExpandedStories(prev => ({
            ...prev,
            [storyId]: !prev[storyId] // Toggle boolean for specific storyId
        }));
    };

    // Handle page change for pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Optional: Scroll to top of the page when changing pages
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Framer Motion variants for card animations
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    if (isLoading) {
        return (
            <div className="p-8 text-center min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-xl font-semibold text-gray-700">Loading community stories...</p>
            </div>
        );
    }

    if (error) {
        console.error("Error fetching stories:", error);
        return (
            <div className="p-8 text-center min-h-screen flex items-center justify-center bg-red-50">
                <p className="text-xl font-semibold text-red-600">Failed to load stories. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-[#FF9494] mb-4 tracking-tight">
                    Community Stories
                </h1>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                    Read inspiring travel stories from our community members.
                </p>
            </header>

            {/* Conditional rendering based on totalStories for accurate message */}
            {totalStories === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow-lg">
                    <p className="text-2xl text-gray-600 font-medium">No stories available yet. Check back later!</p>
                    <p className="text-md text-gray-400 mt-2">
                        If you're an admin, ensure stories have 'approved' status in MongoDB.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stories.map(story => {
                            const isExpanded = expandedStories[story._id];
                            const charLimit = 250;
                            const isLongStory = story.story.length > charLimit;

                            return (
                                <motion.div // Wrap with motion.div for animation
                                    key={story._id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible" // Animate when element comes into view
                                    viewport={{ once: true, amount: 0.3 }} // Only animate once, when 30% of element is visible
                                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col"
                                >
                                    <h2 className="text-3xl font-bold text-[#FF9494] mb-4 leading-tight">
                                        {story.title}
                                    </h2>

                                    {/* Story Text with Expand/Collapse */}
                                    <div className="flex-grow">
                                        <p className={`text-gray-700 italic text-base leading-relaxed ${!isExpanded && isLongStory ? 'line-clamp-5' : ''}`}>
                                            {story.story}
                                        </p>
                                        {isLongStory && (
                                            <button
                                                onClick={() => toggleExpand(story._id)}
                                                className="mt-3 text-[#FF9494] hover:underline font-semibold"
                                            >
                                                {isExpanded ? 'Show Less' : 'Read More...'}
                                            </button>
                                        )}
                                    </div>

                                    {/* Author and Date */}
                                    <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
                                        <p className='italic font-bold'>
                                            By: <span className="font-semibold text-gray-800">{story.author?.name || 'Anonymous'}</span>
                                        </p>
                                        <p>
                                            {new Date(story.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <nav className="flex justify-center mt-12" aria-label="Pagination">
                            <ul className="flex list-none p-0">
                                <li>
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-l-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF9494] focus:border-[#FF9494] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                                    >
                                        Previous
                                    </button>
                                </li>
                                {/* Render page numbers */}
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium
                                                ${currentPage === index + 1 ? 'z-10 bg-[#FF9494] border-[#FF9494] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}
                                                focus:outline-none focus:ring-2 focus:ring-[#FF9494] focus:border-[#FF9494] transition duration-200
                                            `}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF9494] focus:border-[#FF9494] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </div>
    );
};

export default Community;

