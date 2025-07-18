
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; // 
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="footer footer-center p-8 bg-[#FFF5E4] text-base-content rounded border-t border-gray-300 pt-6 hover:border-blue-500 transition-all duration-300 ">
      <aside>
        <Link to="/" className="normal-case text-3xl font-bold text-danger-light">
          <img src="/src/assets/images/logo.png" alt="Logo" className="j-10 lg:h-15  w-auto inline-block" /> 
        </Link>
        <p className='font-semibold'>Follow US</p>
        <div className="grid grid-flow-col gap-4">
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 ">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-[#1C96E8] hover:text-blue-500">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:text-blue-600">
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
        <p className="font-bold text-gray-700 mt-2">
          TourBD Ltd. <br/>Providing reliable tour services since 2025
        </p>
        <p className="text-sm text-gray-600">Copyright © 2025 - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
