import React, { useEffect, useState } from 'react';
import { Outlet, useNavigation, useLocation } from 'react-router';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners'; 

const GlobalLayoutWrapper = () => {
  const navigation = useNavigation();
  const location = useLocation(); 
  const isFetching = useIsFetching(); 
  const isMutating = useIsMutating(); 

  const isGlobalLoading = navigation.state === 'loading' || isFetching > 0 || isMutating > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); 

  return (
    <>
      {isGlobalLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-[9999] flex flex-col items-center justify-center">
          <BounceLoader color="#FF9494" size={60} />
          <p className="mt-4 text-xl font-semibold text-[#FF9494]">Loading content...</p>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default GlobalLayoutWrapper;