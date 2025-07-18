import React, { useEffect, useState } from 'react';
import { Outlet, useNavigation, useLocation } from 'react-router';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners'; // Import a spinner

const GlobalLayoutWrapper = () => {
  const navigation = useNavigation();
  const location = useLocation(); // To detect route changes for scroll to top
  const isFetching = useIsFetching(); // Global fetch status from React Query
  const isMutating = useIsMutating(); // Global mutate status from React Query

  // Determine if a global loading state is active
  const isGlobalLoading = navigation.state === 'loading' || isFetching > 0 || isMutating > 0;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Re-run when pathname changes

  return (
    <>
      {/* Global Loading Overlay with Animation */}
      {isGlobalLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-[9999] flex flex-col items-center justify-center">
          <BounceLoader color="#FF9494" size={60} />
          <p className="mt-4 text-xl font-semibold text-[#FF9494]">Loading content...</p>
        </div>
      )}

      {/* Renders the current page component */}
      <Outlet />
    </>
  );
};

export default GlobalLayoutWrapper;