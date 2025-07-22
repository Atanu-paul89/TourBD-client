import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router'; 
import { FadeLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthContext } from '../providers/AuthContext';

const MySwal = withReactContent(Swal); 

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate(); 

  const alertShownRef = React.useRef(false);

  useEffect(() => {
    if (!user && !loading && !alertShownRef.current) {
      alertShownRef.current = true; 

      MySwal.fire({
        title: 'Authentication Required',
        html: 'You need to login or register first to access this page.',
        icon: 'warning', 
        showCancelButton: true,
        confirmButtonColor: '#FF9494', 
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Cancel',
        allowOutsideClick: false, 
        allowEscapeKey: false,   
      }).then((result) => {
        if (result.isConfirmed) {

          navigate('/login', { state: { from: location }, replace: true });
        } else {

          navigate('/', { replace: true }); 
        }
      });
    }

    return () => {
      alertShownRef.current = false;
    };
  }, [user, loading, location, navigate]); 

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

  return null;
};

export default PrivateRoute;


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