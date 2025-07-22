
import React from 'react';
import { useRouteError, Link} from 'react-router'; // Import Link

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5E4] text-gray-800 p-4">
      <h1 className="text-6xl font-bold text-primary mb-4">Oops!</h1>
      <p className="text-2xl text-gray-700 mb-2 font-bold">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg text-gray-600 font-semibold">
        <i>{error.statusText || error.message}</i>
      </p>
      <p className="mt-8">
        <Link to="/" className="btn btn-primary text-white">Go to Home</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
