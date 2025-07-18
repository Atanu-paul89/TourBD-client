// import React, { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router';

// import { FadeLoader } from 'react-spinners'; // You can use any spinner from react-spinners
// import { AuthContext } from '../providers/AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext); // Get user and loading state from AuthContext
//   const location = useLocation(); // Get current location to redirect back after login

//   if (loading) {
//     // Show a loading spinner while authentication state is being determined
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5E4] py-16">
//         <FadeLoader color="#FF9494" size={50} />
//         <p className="mt-4 text-xl font-semibold text-[#FF9494]">Checking authentication...</p>
//       </div>
//     );
//   }

//   if (user) {
//     // If user is logged in, render the protected component
//     return children;
//   }

//   // If not logged in and not loading, redirect to login page
//   // Pass the current location state to redirect back after successful login
//   return <Navigate to="/login" state={{ from: location }} replace />;
// };

// export default PrivateRoute;


// import React, { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router'; 
// import { FadeLoader } from 'react-spinners';

// import toast from 'react-hot-toast'; 
// import { AuthContext } from '../providers/AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);
//   const location = useLocation();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5E4] py-16">
//         <FadeLoader color="#FF9494" size={50} />
//         <p className="mt-4 text-xl font-semibold text-[#FF9494]">Checking authentication...</p>
//       </div>
//     );
//   }

//   if (user) {
//     return children;
//   }

//   // If not logged in, show toast and redirect
//   // <--- NEW: Add a toast message before navigating
//   toast.error("You need to login or register first to access this page!");

//   return (
//     <Navigate
//       to="/login"
//       state={{ from: location, message: "You need to login or register first!" }} // <--- NEW: Pass a message in state
//       replace
//     />
//   );
// };

// export default PrivateRoute;

import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router'; // Import useNavigate
import { FadeLoader } from 'react-spinners';


// Import SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthContext } from '../providers/AuthContext';

const MySwal = withReactContent(Swal); // Create a SweetAlert instance with React content support

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate(); // Get the navigate function

  // Use a ref or state to prevent showing the alert multiple times if the component re-renders
  const alertShownRef = React.useRef(false);

  useEffect(() => {
    // Only show the alert if not authenticated and it hasn't been shown yet for this navigation attempt
    if (!user && !loading && !alertShownRef.current) {
      alertShownRef.current = true; // Mark as shown to prevent re-triggering

      MySwal.fire({
        title: 'Authentication Required',
        html: 'You need to login or register first to access this page.',
        icon: 'warning', // Use a warning icon
        showCancelButton: true,
        confirmButtonColor: '#FF9494', // Match your theme color
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Cancel',
        allowOutsideClick: false, // Prevent closing by clicking outside
        allowEscapeKey: false,   // Prevent closing with escape key
      }).then((result) => {
        if (result.isConfirmed) {
          // If user clicks "Login Now", redirect to login page
          navigate('/login', { state: { from: location }, replace: true });
        } else {
          // If user clicks "Cancel" or dismisses, redirect back to home or a safe page
          // This prevents them from being stuck on a blank private route
          navigate('/', { replace: true }); // Redirect to home page
        }
      });
    }

    // Reset the ref when component unmounts or location changes (for new private route attempts)
    // This allows the alert to be shown again if the user navigates to another private route
    return () => {
      alertShownRef.current = false;
    };
  }, [user, loading, location, navigate]); // Dependencies for useEffect

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5E4] py-16">
        <FadeLoader color="#FF9494" size={50} />
        <p className="mt-4 text-xl font-semibold text-[#FF9494]">Checking authentication...</p>
      </div>
    );
  }

  if (user) {
    return children;
  }

  // We don't render Navigate directly here because SweetAlert2 handles the redirection
  // We return null or a loading state while SweetAlert is active to prevent rendering children prematurely
  return null;
};

export default PrivateRoute;

// import React, { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router';
// import { FadeLoader } from 'react-spinners';
// import { AuthContext } from '../providers/AuthContext';


// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);
//   const location = useLocation();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5E4] py-16">
//         <FadeLoader color="#FF9494" size={50} />
//         <p className="mt-4 text-xl font-semibold text-[#FF9494]">Checking authentication...</p>
//       </div>
//     );
//   }

//   if (user) {
//     return children;
//   }

//   // <--- REMOVED: toast.error("You need to login or register first to access this page!");

//   return (
//     <Navigate
//       to="/login"
//       state={{ from: location, message: "You need to login or register first to access this page!" }} // Keep passing the message
//       replace
//     />
//   );
// };

// export default PrivateRoute;