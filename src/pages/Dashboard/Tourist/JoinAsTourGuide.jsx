
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // Adjust path as needed
import { AuthContext } from '../../../providers/AuthContext'; // Adjust path as needed
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider

// Create a query client instance (if not already done at a higher level)
// This is typically done in your App.jsx or main.jsx
const queryClient = new QueryClient();

// A list of relevant destinations (you can expand this)
const preferredDestinationsOptions = [
    'Cox\'s Bazar', 'Saint Martin\'s Island', 'Sundarbans', 'Sreemangal',
    'Bandarban', 'Sylhet', 'Dhaka', 'Chittagong Hill Tracts',
    'Rangamati', 'Kuakata', 'Paharpur', 'Mahasthangarh'
];

const JoinAsTourGuideContent = () => { // Renamed to avoid direct export and allow QueryClientProvider
    const { user, loading: authLoading } = useContext(AuthContext); // Get current user from AuthContext, and authLoading
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [hasNoPortfolio, setHasNoPortfolio] = useState(false);

    // Watch for changes in the 'portfolioWebsite' field or checkbox
    const portfolioWebsiteValue = watch('portfolioWebsite');

    // Query to check for existing pending/approved applications for this user
    const { data: existingApplication, isLoading: checkingApplication, isError: applicationCheckError, refetch } = useQuery({
        queryKey: ['myGuideApplication', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                // Important: Return a non-undefined value or throw an error
                // when user.email is not available. Returning null is a common pattern.
                return null;
            }
            try {
                // Fetch applications for the current user
                const res = await axiosSecure.get(`/guide-applications/user/${user.email}`);
                // Filter to find pending or approved applications
                const pendingOrApproved = res.data.find(app => app.status === 'pending' || app.status === 'approved');
                return pendingOrApproved || null; // Return null if no application is found
            } catch (error) {
                console.error("Error fetching existing guide application:", error);
                throw new Error("Failed to fetch existing application status."); // Propagate error
            }
        },
        enabled: !!user?.email && !authLoading, // Only enable if user email is available and auth is not loading
        staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
        cacheTime: 10 * 60 * 1000, // Cache for 10 minutes
        retry: 1, // Retry once on failure
    });

    useEffect(() => {
        if (existingApplication) {
            // Pre-fill form if an application exists and it's not rejected
            // This ensures fields are populated if they are meant to be displayed
            // even if disabled.
            if (existingApplication.status !== 'rejected') {
                reset(existingApplication);
                setHasNoPortfolio(existingApplication.portfolioWebsite === "N/A");
            }
        }
    }, [existingApplication, reset]);


    const onSubmit = async (data) => {
        // Ensure email and name are taken from the authenticated user
        const applicationData = {
            applicantName: user?.displayName || data.name, // Use user's display name if available
            applicantEmail: user?.email, // Crucial: use authenticated user's email
            phone: data.phone,
            experienceDuration: parseFloat(data.experienceDuration), // Convert to number
            preferredDestinations: data.preferredDestinations,
            bio: data.bio,
            imageUrl: data.imageUrl,
            cvUrl: data.cvUrl,
            portfolioWebsite: hasNoPortfolio ? "N/A" : data.portfolioWebsite, // Handle "N/A" for no portfolio
            status: 'pending', // Initial status
            appliedAt: new Date(), // Timestamp of application
        };

        try {
            const res = await axiosSecure.post('/guide-applications', applicationData);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted!',
                    html: `Your application to join as a guide has been submitted for verification.<br>
                           You will receive an email about the result, and your dashboard will be updated.`,
                    confirmButtonText: 'Okay, Got It!'
                });
                reset(); // Clear form fields
                setHasNoPortfolio(false);
                refetch(); // Re-fetch application status to update UI immediately
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'There was an issue with your application. Please try again.',
                });
            }
        } catch (error) {
            console.error("Error submitting guide application:", error);
            const errorMessage = error.response?.data?.message || "Failed to submit application. Please try again.";
            Swal.fire({
                icon: 'error',
                title: 'Submission Error',
                text: errorMessage,
            });
        }
    };

    if (authLoading) { // Added check for auth loading
        return <div className="text-center py-8 text-lg font-medium">Loading user data...</div>;
    }

    if (checkingApplication) { // Image_d70049.png
        return <div className="text-center py-8 text-lg font-medium">Checking application status...</div>;
    }

    if (applicationCheckError) { // This is where the error "Error checking application status." might come from
        return <div className="text-center py-8 text-xl font-bold text-red-600">Error checking application status.</div>;
    }

    // Determine if the form should be disabled
    const isFormDisabled = existingApplication && (existingApplication.status === 'pending' || existingApplication.status === 'approved');
    const isRejected = existingApplication && existingApplication.status === 'rejected';

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen rounded-lg shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-rose-500 mb-6 sm:mb-8">Tourist: Join as a Tour Guide</h1>
            <p className="text-center text-gray-700 mb-8 sm:mb-10 text-base sm:text-lg">
                Fill out the form below to apply to become a tour guide and share your passion for travel.
            </p>

            {isFormDisabled ? (
                <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto text-center">
                    {existingApplication.status === 'pending' && (
                        <>
                            <h3 className="text-2xl font-bold text-yellow-600 mb-4">Application Pending!</h3>
                            <p className="text-gray-700">
                                You have already submitted an application to become a tour guide.
                                Your application is currently <span className="font-bold text-yellow-700">pending</span> review by the administration.
                            </p>
                            <p className="text-gray-500 mt-2">
                                We will notify you via email once a decision has been made.
                            </p>
                        </>
                    )}
                    {existingApplication.status === 'approved' && (
                        <>
                            <h3 className="text-2xl font-bold text-green-600 mb-4">Congratulations!</h3>
                            <p className="text-gray-700">
                                Your application to become a tour guide has been <span className="font-bold text-green-700">approved</span>!
                                Your role has been updated. Please check your Tour Guide Dashboard for assigned tours.
                            </p>
                            <p className="text-gray-500 mt-2">
                                Welcome to the team!
                            </p>
                        </>
                    )}
                </div>
            ) : isRejected ? (
                 <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-bold text-red-600 mb-4">Application Rejected</h3>
                    <p className="text-gray-700">
                        Unfortunately, your previous application was <span className="font-bold text-red-700">rejected</span>.
                    </p>
                    {existingApplication.remarks && (
                        <p className="text-gray-600 mt-2 italic">Reason: {existingApplication.remarks}</p>
                    )}
                    <p className="text-gray-500 mt-2">
                        You may submit a new application if you meet the criteria.
                    </p>
                    <button
                        onClick={() => {
                            // Clear existing application data to re-enable the form
                            // This works by invalidating the query and letting it refetch (which will be null if rejected)
                            queryClient.invalidateQueries(['myGuideApplication', user?.email]);
                            reset(); // Also reset the form fields
                            setHasNoPortfolio(false); // Reset portfolio checkbox
                        }}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Re-apply
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-4">
                    {/* Name (pre-filled from user context if available, otherwise input) */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            defaultValue={user?.displayName || ''}
                            readOnly={!!user?.displayName} // Make read-only if display name exists
                            {...register('name', { required: !user?.displayName && 'Full Name is required' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                    </div>

                    {/* Email (pre-filled from user context, read-only) */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            defaultValue={user?.email || ''}
                            readOnly // Always read-only
                            {...register('email', { required: 'Email is required' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100 cursor-not-allowed"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            {...register('phone', {
                                required: 'Phone Number is required',
                                pattern: {
                                    value: /^[0-9]{10,15}$/, // Basic phone number regex
                                    message: 'Invalid phone number format'
                                }
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
                    </div>

                    {/* Experience Duration */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experienceDuration">Experience Duration (in years, put 0 for fresher)</label>
                        <input
                            type="number"
                            id="experienceDuration"
                            step="0.5" // Allow half years
                            min="0"
                            {...register('experienceDuration', {
                                required: 'Experience Duration is required',
                                min: { value: 0, message: 'Experience cannot be negative' },
                                valueAsNumber: true, // Converts input to number
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.experienceDuration && <p className="text-red-500 text-xs italic">{errors.experienceDuration.message}</p>}
                    </div>

                    {/* Preferred Destinations (Multi-select) */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preferredDestinations">Preferred Destinations (Select all that apply)</label>
                        <select
                            multiple
                            id="preferredDestinations"
                            {...register('preferredDestinations', { required: 'At least one preferred destination is required' })}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                        >
                            {preferredDestinationsOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.preferredDestinations && <p className="text-red-500 text-xs italic">{errors.preferredDestinations.message}</p>}
                        <p className="text-gray-500 text-xs mt-1">Hold Ctrl/Cmd to select multiple options.</p>
                    </div>

                    {/* Brief Bio */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">Brief Bio</label>
                        <textarea
                            id="bio"
                            rows="4"
                            {...register('bio', { required: 'A brief bio is required', minLength: { value: 50, message: 'Bio must be at least 50 characters' } })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y"
                        ></textarea>
                        {errors.bio && <p className="text-red-500 text-xs italic">{errors.bio.message}</p>}
                    </div>

                    {/* Image Upload (URL) */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">Profile Image URL</label>
                        <input
                            type="url"
                            id="imageUrl"
                            {...register('imageUrl', {
                                required: 'Profile Image URL is required',
                                pattern: {
                                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                                    message: 'Please enter a valid URL'
                                }
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.imageUrl && <p className="text-red-500 text-xs italic">{errors.imageUrl.message}</p>}
                    </div>

                    {/* CV Upload (URL) */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvUrl">CV / Resume URL</label>
                        <input
                            type="url"
                            id="cvUrl"
                            {...register('cvUrl', {
                                required: 'CV URL is required',
                                pattern: {
                                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                                    message: 'Please enter a valid URL'
                                }
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.cvUrl && <p className="text-red-500 text-xs italic">{errors.cvUrl.message}</p>}
                    </div>

                    {/* Portfolio Website */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="portfolioWebsite">Portfolio Website URL</label>
                        <input
                            type="url"
                            id="portfolioWebsite"
                            {...register('portfolioWebsite', {
                                required: !hasNoPortfolio && 'Portfolio Website URL is required, or check "I don\'t have portfolio"',
                                pattern: {
                                    value: hasNoPortfolio ? undefined : /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                                    message: 'Please enter a valid URL'
                                }
                            })}
                            disabled={hasNoPortfolio}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${hasNoPortfolio ? 'bg-gray-200' : ''}`}
                        />
                        {errors.portfolioWebsite && !hasNoPortfolio && <p className="text-red-500 text-xs italic">{errors.portfolioWebsite.message}</p>}
                        <div className="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                id="noPortfolio"
                                checked={hasNoPortfolio}
                                onChange={(e) => {
                                    setHasNoPortfolio(e.target.checked);
                                    if (e.target.checked) {
                                        reset({ ...watch(), portfolioWebsite: '' }); // Clear field when checked
                                    }
                                }}
                                className="mr-2"
                            />
                            <label htmlFor="noPortfolio" className="text-sm text-gray-700">I don't have a portfolio website</label>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

// Wrapper component to provide QueryClientProvider
const JoinAsTourGuide = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <JoinAsTourGuideContent />
        </QueryClientProvider>
    );
};

export default JoinAsTourGuide;

