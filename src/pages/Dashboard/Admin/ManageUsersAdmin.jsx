import React, { useContext, useEffect, useState, useCallback } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthContext';

const ManageUsersAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdatingRole, setIsUpdatingRole] = useState(false);
    const [isDeletingUser, setIsDeletingUser] = useState(false); 

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        if (!axiosSecure) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosSecure.get('/users');
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setError("Failed to load users. Please try again later.");
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response?.data?.message || 'Failed to fetch users. Please check your network or try again!',
            });
        }
    }, [axiosSecure]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleChangeRole = async (userId, newRole, userName, userEmail) => {
        if (isUpdatingRole || isDeletingUser) return; 

        const { isConfirmed } = await Swal.fire({
            title: `Change ${userName || userEmail}'s role to ${newRole}?`,
            text: `This will update ${userName || userEmail}'s role to ${newRole}. Are you sure?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        });

        if (!isConfirmed) {
            return;
        }

        setIsUpdatingRole(true);

        try {
            const response = await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Role Updated!',
                    text: `${userName || userEmail}'s role has been successfully changed to ${newRole}.`,
                });
                fetchUsers();
            } else {
                throw new Error(response.data?.message || 'Failed to update role.');
            }
        } catch (err) {
            console.error("Error changing user role:", err);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Update Role',
                text: err.response?.data?.message || 'An error occurred while changing the user role.',
            });
        } finally {
            setIsUpdatingRole(false);
        }
    };

    const handleDeleteUser = async (userId, userName, userEmail) => {
        if (isUpdatingRole || isDeletingUser) return; 

        if (user && user.email === userEmail) {
            Swal.fire({
                icon: 'error',
                title: 'Cannot Delete Yourself',
                text: 'You cannot delete your own admin account.',
            });
            return;
        }

        const { isConfirmed } = await Swal.fire({
            title: `Are you sure you want to delete ${userName || userEmail}?`,
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!isConfirmed) {
            return;
        }

        setIsDeletingUser(true); 

        try {
            const response = await axiosSecure.delete(`/users/${userId}`);

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'User Deleted!',
                    text: `${userName || userEmail} has been successfully deleted.`,
                });
                fetchUsers(); 
            } else {
                throw new Error(response.data?.message || 'Failed to delete user.');
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Delete User',
                text: err.response?.data?.message || 'An error occurred while deleting the user.',
            });
        } finally {
            setIsDeletingUser(false); 
        }
    };


    if (loading) {
        return <div className="text-center py-10 text-xl text-gray-600">Loading users...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500 text-xl">{error}</div>;
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-[#FF9494] mb-6">Admin: Manage All Users</h1>
            <p className="mb-8 text-gray-700">View and manage roles for all registered users, and delete user accounts.</p>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Current Role</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map(userItem => (
                            <tr key={userItem._id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{userItem.displayName || userItem.name || 'N/A'}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">{userItem.email}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800 capitalize font-medium">
                                    {userItem.role || 'tourist'}
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm">
                                    {userItem.role !== 'admin' && ( 
                                        <>
                                            <button
                                                onClick={() => handleChangeRole(userItem._id, 'tour_guide', userItem.displayName || userItem.name, userItem.email)}
                                                className={`px-3 py-1 rounded-md text-white font-semibold text-xs transition-colors duration-200 ${userItem.role === 'tour_guide' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                                                disabled={userItem.role === 'tour_guide' || isUpdatingRole || isDeletingUser}
                                            >
                                                Make Tour Guide
                                            </button>
                                            <button
                                                onClick={() => handleChangeRole(userItem._id, 'admin', userItem.displayName || userItem.name, userItem.email)}
                                                className={`ml-2 px-3 py-1 rounded-md text-white font-semibold text-xs transition-colors duration-200 ${userItem.role === 'admin' ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                                                disabled={userItem.role === 'admin' || isUpdatingRole || isDeletingUser}
                                            >
                                                Make Admin
                                            </button>
                                        </>
                                    )}
                                    {userItem.role === 'admin' && ( 
                                        <span className="text-gray-500 italic text-xs">Admin role fixed</span>
                                    )}

                                    {/* Delete Button */}
                                    {userItem.email !== user?.email && ( 
                                        <button
                                            onClick={() => handleDeleteUser(userItem._id, userItem.displayName || userItem.name, userItem.email)}
                                            className="ml-2 px-3 py-1 rounded-md bg-red-500 text-white font-semibold text-xs hover:bg-red-600 transition-colors duration-200"
                                            disabled={isDeletingUser || isUpdatingRole} 
                                        >
                                            Delete
                                        </button>
                                    )}
                                    {userItem.email === user?.email && (
                                        <span className="ml-2 text-red-500 italic text-xs">Cannot delete self</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && !loading && (
                <p className="text-center text-gray-500 mt-8 text-lg">No users found in the system.</p>
            )}
        </div>
    );
};

export default ManageUsersAdmin;