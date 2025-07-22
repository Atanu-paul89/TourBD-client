import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthContext';

const ManageProfileAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({ displayName: '', photoURL: '' });

  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (user?.email) {
        try {
          setLoading(true);
          const res = await axiosSecure.get(`/users/${user.email}`);
          setAdminProfile(res.data);
        } catch (err) {
          console.error("Error fetching admin profile:", err);
          setError("Failed to load profile.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("No logged-in user.");
      }
    };

    fetchAdminProfile();
  }, [user, axiosSecure]);

  const handleEditClick = () => {
    setEditData({
      displayName: adminProfile.displayName || '',
      photoURL: adminProfile.photoURL || ''
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, {
        displayName: editData.displayName,
        photoURL: editData.photoURL
      });
      if (res.data.modifiedCount > 0) {
        setAdminProfile({ ...adminProfile, ...editData });
        setIsEditOpen(false);
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-[#FF9494] mb-4 text-center">My Profile</h1>

      {adminProfile.photoURL && (
        <div className="flex justify-center mb-6">
          <img
            src={adminProfile.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#FF9494] shadow"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/128x128/cccccc/ffffff?text=No+Image';
            }}
          />
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-3">
        <label className="block text-sm text-gray-600 font-semibold">Name</label>
        <p className="text-lg font-medium text-gray-900">{adminProfile.displayName || 'N/A'}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-3">
        <label className="block text-sm text-gray-600 font-semibold">Email</label>
        <p className="text-lg font-medium text-gray-900">{adminProfile.email}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
        <label className="block text-sm text-gray-600 font-semibold">Role</label>
        <p className="text-lg font-medium capitalize text-gray-900">{adminProfile.role}</p>
      </div>

      <div className="text-center">
        <button
          className="px-6 py-2 bg-[#FF9494] text-white rounded hover:bg-[#ff7d7d]"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>

      {/* Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold text-center mb-4 text-[#FF9494]">Edit Profile</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editData.displayName}
                onChange={(e) => setEditData({ ...editData, displayName: e.target.value })}
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Photo URL</label>
              <input
                type="text"
                value={editData.photoURL}
                onChange={(e) => setEditData({ ...editData, photoURL: e.target.value })}
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#FF9494] hover:bg-[#ff7d7d] text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfileAdmin;





