
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false); 

  const mobileMenuRef = useRef(null); 
  const desktopDropdownRef = useRef(null); 
  const navigate = useNavigate();
  const handleLogout = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF9494',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logOut();
          Swal.fire({
            icon: 'success',
            title: 'Logged Out!',
            text: 'You have been successfully logged out.',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/');
          setDesktopDropdownOpen(false); 
          setMobileMenuOpen(false); 
        } catch (error) {
          console.error('Logout error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Logout Failed',
            text: error.message,
          });
        }
      }
    });
  };

  // Close menus if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle desktop dropdown
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Depend on nothing as refs are stable

  const navItems = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#FF9494] font-bold" : "text-gray-700 hover:text-[#FF9494] transition-colors duration-200"} onClick={() => {setMobileMenuOpen(false); setDesktopDropdownOpen(false);}}>Home</NavLink></li>
      <li><NavLink to="/community" className={({ isActive }) => isActive ? "text-[#FF9494] font-bold" : "text-gray-700 hover:text-[#FF9494] transition-colors duration-200"} onClick={() => {setMobileMenuOpen(false); setDesktopDropdownOpen(false);}}>Community</NavLink></li>
      <li><NavLink to="/about-us" className={({ isActive }) => isActive ? "text-[#FF9494] font-bold" : "text-gray-700 hover:text-[#FF9494] transition-colors duration-200"} onClick={() => {setMobileMenuOpen(false); setDesktopDropdownOpen(false);}}>About Us</NavLink></li>
      <li><NavLink to="/all-trips" className={({ isActive }) => isActive ? "text-[#FF9494] font-bold" : "text-gray-700 hover:text-[#FF9494] transition-colors duration-200"} onClick={() => {setMobileMenuOpen(false); setDesktopDropdownOpen(false);}}>Trips</NavLink></li>
    </>
  );

  return (
    <nav className="bg-[#FFF5E4] py-2 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left Section: Logo and Website Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/src/assets/images/logo.png"
            alt="TourBD Logo"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <span className="text-2xl font-extrabold text-[#FF9494]">TourBD</span>
        </Link>

        {/* Center Section: Desktop Navigation Links (hidden on mobile) */}
        <ul className="hidden md:flex space-x-8 text-lg">
          {navItems}
        </ul>

        {/* Right Section: Desktop User Profile/Login OR Mobile Hamburger/Login */}
        <div className="flex items-center space-x-4">
          {/* Desktop User Profile/Login (hidden on mobile) */}
          <div className="hidden md:flex items-center relative" ref={desktopDropdownRef}> {/* Ref on the container */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium hidden sm:block">{user.displayName || user.email}</span>
                <button
                  onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)} // Control desktop dropdown state
                  className="focus:outline-none rounded-full overflow-hidden border-2 border-[#FF9494] transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={user.photoURL || 'https://c0.wallpaperflare.com/preview/960/407/672/malta-rocks-violet-sky-dwejra-bay.jpg'}
                    alt="User Profile"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </button>
                {/* Desktop User Dropdown Menu */}
                {desktopDropdownOpen && ( // Controlled by desktopDropdownOpen state
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      <p className="font-semibold">{user.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDesktopDropdownOpen(false)}>
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="bg-[#FF9494] hover:bg-[#E07B7B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300">
                  Login
                </Link>
                <Link to="/register" className="hidden lg:block border-2 border-[#FF9494] text-[#FF9494] hover:bg-[#FF9494] hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button & Login (shown on mobile, hidden on desktop) */}
          <div className="md:hidden flex items-center space-x-2">
            {!user && (
               <Link to="/login" className="bg-[#FF9494] hover:bg-[#E07B7B] text-white font-bold py-1.5 px-3 rounded text-sm focus:outline-none focus:shadow-outline transition-colors duration-300">
                Login
              </Link>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content (always present but toggled by mobileMenuOpen) */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-2 z-40">
          <ul className="flex flex-col items-center space-y-3 text-lg">
            {/* User Info & Avatar (only if logged in, for mobile menu) */}
            {user && (
              <li className="mb-4 text-center border-b pb-2 w-full">
                <img
                  src={user.photoURL || 'https://c0.wallpaperflare.com/preview/960/407/672/malta-rocks-violet-sky-dwejra-bay.jpg'}
                  alt="User Profile"
                  className="w-16 h-16 object-cover rounded-full mx-auto mb-2 border-2 border-[#FF9494]"
                />
                <p className="font-semibold text-gray-800">{user.displayName || 'User'}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </li>
            )}
            {navItems}

            {/* Conditional Auth Links for Mobile */}
            {user ? (
              <>
                <li><Link to="/dashboard" className="text-gray-700 hover:text-[#FF9494]" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link></li>
                <li><button onClick={() => { handleLogout(); }} className="text-gray-700 hover:text-[#FF9494]">Logout</button></li>
              </>
            ) : (
              <>
                <li className="md:hidden">
                    <Link to="/register" className="border-2 border-[#FF9494] text-[#FF9494] hover:bg-[#FF9494] hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300" onClick={() => setMobileMenuOpen(false)}>
                        Register
                    </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;