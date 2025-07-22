
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthContext'; 
import { useForm } from 'react-hook-form'; 
import Swal from 'sweetalert2'; 

const Register = () => {
  const { createUser, userUpdateProfile, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch("password"); 

  const onSubmit = async (data) => {
    const { name, email, photoURL, password: userPassword } = data;

    // Password validation
    if (userPassword.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 6 characters long!',
      });
      return;
    }
    if (!/[A-Z]/.test(userPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must contain at least one uppercase letter!',
      });
      return;
    }
    if (!/[a-z]/.test(userPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must contain at least one lowercase letter!',
      });
      return;
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(userPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must contain at least one special character!',
      });
      return;
    }

    try {

      await createUser(email, userPassword);

      await userUpdateProfile(name, photoURL);

      await logOut(); 
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been created. Please log in.',
      });
      navigate('/login'); 
      
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5E4] p-4"> 
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#FF9494] mb-8">Register Now</h2> 
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoURL">
              Photo URL (Optional)
            </label>
            <input
              type="text"
              id="photoURL"
              {...register('photoURL')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#FF9494] hover:bg-[#E07B7B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account? <Link to="/login" className="text-[#FF9494] hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;