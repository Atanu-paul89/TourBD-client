import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; 
import { AuthContext } from '../../../providers/AuthContext';


const EditStoryTourist = () => {
    const { id } = useParams(); // Get story ID from URL
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Fetch the specific story data to pre-fill the form
    const { data: story = {}, isLoading, isError } = useQuery({
        queryKey: ['storyToEdit', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories/${id}`); // Assuming you have a GET /stories/:id endpoint
            return res.data;
        },
        enabled: !!id, // Only run if ID is available
        // You might add staleTime/cacheTime here for better UX
    });

    useEffect(() => {
        // Populate form fields when story data is loaded
        if (story && story._id) {
            reset({
                title: story.title,
                story: story.story, // Assuming 'story' is the field name for the content
            });
            // Optional: If you want to check if the current user is the author
            if (user?.email && story?.author?.email && user.email !== story.author.email) {
                Swal.fire({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'You can only edit your own stories.',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/dashboard/tourist/manage-stories'));
            }
        }
    }, [story, reset, user, navigate]);

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/stories/${id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Story Updated!',
                    text: 'Your story has been successfully updated.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/tourist/manage-stories'); // Redirect back to My Stories
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No Changes',
                    text: 'No changes were made to the story.',
                });
            }
        } catch (error) {
            console.error("Error updating story:", error);
            const errorMessage = error.response?.data?.message || "Failed to update story.";
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: errorMessage,
            });
        }
    };

    if (isLoading) {
        return <div className="text-center py-8">Loading story data...</div>;
    }

    if (isError || !story._id) {
        return <div className="text-center py-8 text-red-600">Error loading story or story not found.</div>;
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen rounded-lg shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-rose-500 mb-6 sm:mb-8">Edit Story</h2>
            <p className="text-center text-gray-700 mb-8 sm:mb-10 text-base sm:text-lg">
                Modify the details of your travel story below.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Story Title:</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { required: 'Story title is required' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.title && <p className="text-red-500 text-xs italic mt-1">{errors.title.message}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="story" className="block text-gray-700 text-sm font-bold mb-2">Your Story:</label>
                    <textarea
                        id="story"
                        {...register('story', { required: 'Story content is required' })}
                        rows="8"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y"
                    ></textarea>
                    {errors.story && <p className="text-red-500 text-xs italic mt-1">{errors.story.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Story
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/tourist/manage-stories')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStoryTourist;