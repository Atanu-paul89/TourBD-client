
import React, { useContext, useEffect, useState, useCallback } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'; 
import { AuthContext } from '../../../providers/AuthContext';

const ManageCandidatesAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false); 

    const fetchApplications = useCallback(async () => {
        setLoading(true);
        setError(null);
        if (!axiosSecure) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosSecure.get('/guide-applications');
            setApplications(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch guide applications:", err);
            setError("Failed to load guide applications. Please try again later.");
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response?.data?.message || 'Failed to fetch guide applications. Please check your network or try again!',
            });
        }
    }, [axiosSecure]);


    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const handleApprove = async (applicationId, applicantEmail, applicantName) => {
        if (isProcessing) return; 

        const { isConfirmed } = await Swal.fire({
            title: `Approve ${applicantName || applicantEmail}'s application?`,
            text: "This will make them a Tour Guide!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        });

        if (!isConfirmed) {
            return;
        }

        setIsProcessing(true); 

        try {

            const response = await axiosSecure.patch(`/guide-applications/${applicationId}/approve`, { email: applicantEmail });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Approved!',
                    text: `${applicantName || applicantEmail} is now a Tour Guide.`,
                });
                fetchApplications(); 
            } else {
                throw new Error(response.data?.message || 'Failed to approve application.');
            }
        } catch (err) {
            console.error("Error approving application:", err);
            Swal.fire({
                icon: 'error',
                title: 'Approval Failed!',
                text: err.response?.data?.message || 'An error occurred during approval. Please try again.',
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async (applicationId, applicantName, applicantEmail) => {
        if (isProcessing) return; 

        const { value: remarks, isConfirmed } = await Swal.fire({
            title: `Reject ${applicantName || applicantEmail}'s application?`,
            input: 'text',
            inputLabel: 'Reason for rejection (Optional)',
            inputPlaceholder: 'e.g., Lacking experience, invalid documents',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!'
        });

        if (!isConfirmed) {
            return;
        }

        setIsProcessing(true); 

        try {

            const response = await axiosSecure.patch(`/guide-applications/${applicationId}/reject`, { remarks: remarks || 'No reason provided.' });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Rejected!',
                    text: `${applicantName || applicantEmail}'s application has been rejected.`,
                });
                fetchApplications(); 
            } else {
                throw new Error(response.data?.message || 'Failed to reject application.');
            }
        } catch (err) {
            console.error("Error rejecting application:", err);
            Swal.fire({
                icon: 'error',
                title: 'Rejection Failed!',
                text: err.response?.data?.message || 'An error occurred during rejection. Please try again.',
            });
        } finally {
            setIsProcessing(false); 
        }
    };


    if (loading) {
        return <div className="text-center py-10 text-xl text-gray-600">Loading tour guide applications...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500 text-xl">{error}</div>;
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-[#FF9494] mb-6">Admin: Manage Tour Guide Candidates</h1>
            <p className="mb-8 text-gray-700">Review and manage applications from users wishing to become tour guides.</p>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Applicant Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Applied On</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {applications.map(app => (
                            <tr key={app._id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{app.name || 'N/A'}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">{app.email}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm capitalize">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {app.status || 'pending'}
                                    </span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                                    {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm">
                                    {app.status === 'pending' ? (
                                        <>
                                            <button
                                                onClick={() => handleApprove(app._id, app.email, app.name)}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2 text-xs font-semibold transition-colors duration-200"
                                                disabled={isProcessing}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(app._id, app.name, app.email)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs font-semibold transition-colors duration-200"
                                                disabled={isProcessing}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-500 italic text-sm">
                                            {app.status === 'approved' ? 'Approved' : 'Rejected'}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {applications.length === 0 && !loading && (
                <p className="text-center text-gray-500 mt-8 text-lg">No tour guide applications found.</p>
            )}
        </div>
    );
};

export default ManageCandidatesAdmin;