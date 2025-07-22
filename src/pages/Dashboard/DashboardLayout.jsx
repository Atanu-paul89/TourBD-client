import React, { useContext, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router'; // Changed from 'react-router' to 'react-router-dom'
import {
  FaUser, FaClipboardList, FaHeart, FaPlusSquare, FaBookOpen,
  FaUsers, FaBoxes, FaUserTie, FaPenNib, FaChalkboardTeacher,
  FaHome
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { FadeLoader } from 'react-spinners'; // <--- ADD THIS IMPORT
import { AuthContext } from '../../providers/AuthContext';

const MySwal = withReactContent(Swal);

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Determine user role
  const userRole = user?.role; // e.g., 'tourist', 'tour_guide', 'admin'

  useEffect(() => {
    // ... (rest of your useEffect logic remains the same) ...
    if (!loading && !user) {
      // If not logged in, PrivateRoute should already handle this.
      // This is a fallback, though PrivateRoute should prevent reaching here.
      navigate('/login', { replace: true });
    } else if (!loading && user && window.location.pathname === '/dashboard') {
      let redirectTo = '/';
      switch (userRole) {
        case 'tourist':
          redirectTo = '/dashboard/tourist/profile';
          break;
        case 'tour_guide':
          redirectTo = '/dashboard/tour-guide/my-assigned-tours';
          break;
        case 'admin':
          redirectTo = '/dashboard/admin/manage-users';
          break;
        default:
          console.warn('Unknown user role or role not yet loaded:', userRole);
          // If user role is null/undefined after loading, redirect to home or login as a safe fallback
          redirectTo = '/login'; // Or '/'
          // Optionally show a SweetAlert for unknown role
          MySwal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'Your user role could not be determined. Please log in again.',
            confirmButtonColor: '#FF9494'
          });
          break;
      }
      if (window.location.pathname !== redirectTo) {
        navigate(redirectTo, { replace: true });
      }
    }
  }, [user, loading, navigate, userRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5E4] py-16">
        <FadeLoader color="#FF9494" size={50} />
        <p className="mt-4 text-xl font-semibold text-[#FF9494]">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    // If loading is false and user is null, it means PrivateRoute didn't block it,
    // or the session expired. Navigate to login.
    // This is a safety check; PrivateRoute should ideally catch this.
    // navigate('/login', { replace: true }); // Avoid double-redirect
    return null; // PrivateRoute will handle the redirect.
  }

  // ... (rest of the DashboardLayout component) ...
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FFF5E4]">
      {/* Dashboard Sidebar */}
      <div className="w-full md:w-64 bg-[#FF9494] text-white p-6 md:p-8 flex flex-col items-center md:items-start shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
          {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard` : 'Dashboard'}
        </h2>
        <nav className="space-y-4 w-full">
          {/* ... (Your role-based NavLinks as before) ... */}
          {userRole === 'tourist' && (
            <>
              {/* Tourist Links */}
              <NavLink to="/dashboard/tourist/profile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaUser className="text-xl" />
                <span className="text-lg">My Profile</span>
              </NavLink>
              <NavLink to="/dashboard/tourist/bookings" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaClipboardList className="text-xl" />
                <span className="text-lg">My Bookings</span>
              </NavLink>
              <NavLink to="/dashboard/tourist/add-story" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaPenNib className="text-xl" />
                <span className="text-lg">Add Story</span>
              </NavLink>
              <NavLink to="/dashboard/tourist/manage-stories" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaBookOpen className="text-xl" />
                <span className="text-lg">My Stories</span>
              </NavLink>
              <NavLink to="/dashboard/tourist/join-as-guide" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaChalkboardTeacher className="text-xl" />
                <span className="text-lg">Join as Guide</span>
              </NavLink>
              <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaHome className="text-xl" />
                <span className="text-lg">Back to Home</span>
              </NavLink>


            </>
          )}

          {userRole === 'tour_guide' && (
            <>
              {/* Tour Guide Links */}
              <NavLink to="/dashboard/tour-guide/profile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaUserTie className="text-xl" />
                <span className="text-lg">My Profile</span>
              </NavLink>
              <NavLink to="/dashboard/tour-guide/my-assigned-tours" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaClipboardList className="text-xl" />
                <span className="text-lg">Assigned Tours</span>
              </NavLink>
              <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaHome className="text-xl" />
                <span className="text-lg">Back to Home</span>
              </NavLink>
            </>
          )}

          {userRole === 'admin' && (
            <>
              {/* Admin Links */}
              <NavLink to="/dashboard/admin/profile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaUser className="text-xl" />
                <span className="text-lg">My Profile</span>
              </NavLink>
              <NavLink to="/dashboard/admin/manage-users" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaUsers className="text-xl" />
                <span className="text-lg">Manage Users</span>
              </NavLink>
              <NavLink to="/dashboard/admin/manage-candidates" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaUserTie className="text-xl" />
                <span className="text-lg">Manage Candidates</span>
              </NavLink>
              <NavLink to="/dashboard/admin/manage-bookings" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaUserTie className="text-xl" />
                <span className="text-lg">Manage Bookings</span>
              </NavLink>
              <NavLink to="/dashboard/admin/add-package" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaBoxes className="text-xl" />
                <span className="text-lg">Add Package</span>
              </NavLink>
              <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#FF5F7F] font-semibold text-white' : 'hover:bg-[#FF5F7F] hover:text-white'}`}>
                <FaHome className="text-xl" />
                <span className="text-lg">Back to Home</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-6 md:p-10">
        <Outlet /> {/* This is where the specific dashboard pages will render */}
      </div>
    </div>
  );
};

export default DashboardLayout;