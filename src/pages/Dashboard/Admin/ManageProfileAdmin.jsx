import React from 'react';
// import { useContext } from 'react'; // If you want to display admin's profile
// import { AuthContext } from '../../../providers/AuthProvider';

const ManageProfileAdmin = () => {
  // const { user } = useContext(AuthContext);
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-[#FF9494] mb-6">Admin: Manage My Profile</h1>
      <p>This page will allow the admin to view and update their profile details.</p>
    </div>
  );
};

export default ManageProfileAdmin;