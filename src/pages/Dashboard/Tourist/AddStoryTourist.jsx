import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthContext';

const AddStoryTourist = () => {
    const { user } = useContext(AuthContext); 
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const addStoryMutation = useMutation({
        mutationFn: async (newStoryData) => {
            const token = localStorage.getItem('access-token'); 
            const res = await axios.post('http://localhost:5000/stories', newStoryData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Story Added!',
                text: 'Your story has been successfully added.',
                confirmButtonText: 'OK',
            });
            reset(); 
            queryClient.invalidateQueries(['myStories', user?.email]);
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Story!',
                text: `An error occurred: ${err.response?.data?.message || err.message}`,
                confirmButtonText: 'OK',
            });
        },
    });

    const onSubmit = (data) => {

        const storyData = {
            title: data.title,
            story: data.story,
            authorEmail: user?.email, 
            authorName: user?.displayName || 'Anonymous', 
            date: new Date().toISOString(), 

        };
        addStoryMutation.mutate(storyData);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#FF5F7F] mb-6 text-center">Share Your Story</h2>
            <p className="text-gray-700 mb-8 text-center">
                We'd love to hear about your travel experiences! Share your adventures with the community.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Story Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { required: 'Story title is required' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-300"
                        placeholder="e.g., My Amazing Sundarbans Adventure"
                    />
                    {errors.title && <p className="text-red-500 text-xs italic mt-1">{errors.title.message}</p>}
                </div>

                <div>
                    <label htmlFor="story" className="block text-gray-700 text-sm font-bold mb-2">
                        Your Story
                    </label>
                    <textarea
                        id="story"
                        {...register('story', { required: 'Story content is required', minLength: { value: 50, message: 'Story must be at least 50 characters long' } })}
                        rows="8"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-300"
                        placeholder="Write about your journey, memorable moments, challenges, and what you loved..."
                    ></textarea>
                    {errors.story && <p className="text-red-500 text-xs italic mt-1">{errors.story.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#FF5F7F] hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                    disabled={addStoryMutation.isPending}
                >
                    {addStoryMutation.isPending ? 'Submitting...' : 'Add Story'}
                </button>
            </form>
        </div>
    );
};

export default AddStoryTourist;