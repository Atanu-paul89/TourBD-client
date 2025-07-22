
import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../providers/AuthContext'; 
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'; 

const ForgotPassword = () => {
    const { resetPassword } = useContext(AuthContext); 
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { email } = data;
        try {
            await resetPassword(email); 
            Swal.fire({
                icon: 'success',
                title: 'Password Reset Email Sent!',
                text: 'Please check your inbox (and spam folder) for instructions to reset your password.',
            });

        } catch (error) {
            console.error('Password reset error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Password Reset Failed',
                text: error.message || 'Could not send password reset email. Please check the email address.',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFE3E1] p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-[#FF9494] mb-8">Forgot Your Password?</h2>
                <p className="text-center text-gray-600 mb-6">
                    Enter your email address below and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address'
                                }
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-[#FF9494] hover:bg-[#E07B7B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Remembered your password? <Link to="/login" className="text-[#FF9494] hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;