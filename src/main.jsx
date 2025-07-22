import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router"; // <--- CHANGE: Ensure this is react-router-dom
import App from './App.jsx';
import './index.css';

import Home from './pages/Home.jsx';
import Community from './pages/Community.jsx';
import AboutUs from './pages/AboutUs.jsx';
import AllTrips from './pages/AllTrips.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import PackageDetails from './pages/PackageDetails.jsx';
import TourGuideProfile from './pages/TourGuideProfile.jsx';

// Import the new GlobalLayoutWrapper component
import GlobalLayoutWrapper from './components/GlobalLayoutWrapper.jsx';
import PrivateRoute from './routes/PrivateRoutes.jsx';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './pages/Dashboard/DashboardLayout.jsx';
import MyBookings from './pages/Dashboard/Tourist/MyBookings.jsx';
import AddStoryTourist from './pages/Dashboard/Tourist/AddStoryTourist.jsx';
import ManageProfileTourist from './pages/Dashboard/Tourist/ManageProfileTourist.jsx';
import ManageStoriesTourist from './pages/Dashboard/Tourist/ManageStoriesTourist.jsx';
import JoinAsTourGuide from './pages/Dashboard/Tourist/JoinAsTourGuide.jsx';
import ManageProfileTourGuide from './pages/Dashboard/TourGuide/ManageProfileTourGuide.jsx';
import MyAssignedTours from './pages/Dashboard/TourGuide/MyAssignedTours.jsx';
import ManageProfileAdmin from './pages/Dashboard/Admin/ManageProfileAdmin.jsx';
import ManageUsersAdmin from './pages/Dashboard/Admin/ManageUsersAdmin.jsx';
import ManageCandidatesAdmin from './pages/Dashboard/Admin/ManageCandidatesAdmin.jsx';
import AddPackageAdmin from './pages/Dashboard/Admin/AddPackageAdmin.jsx';
import EditStoryTourist from './pages/Dashboard/Tourist/EditStoryTourist.jsx';
import ManageBookings from './pages/Dashboard/Admin/ManageBookings.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';


// Create a client for Tanstack Query
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component provides the overall layout (Navbar, Footer etc.)
    errorElement: <ErrorPage />,
    children: [
      {
        element: <GlobalLayoutWrapper />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/community",
            element: <Community />,
          },
          {
            path: "/about-us",
            element: <AboutUs />,
          },
          {
            path: "/all-trips",
            element: <AllTrips />,
          },
          {
            path: '/packages/:id',
            element: <PrivateRoute><PackageDetails /></PrivateRoute>,
          },
          {
            path: "/tour-guides/:id",
            element: <PrivateRoute><TourGuideProfile /></PrivateRoute>,
          },
        ]
      },
      // Routes that might not need the global layout wrapper, like auth pages
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: '/forgot-password', 
        element: <ForgotPassword />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      // You can add dashboard routes here if they don't need the global wrapper
      // or wrap them in another GlobalLayoutWrapper if they do.
    ],
  },
  // Dashboard route wrapped by PrivateRoute
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // Tourist Routes
      {
        path: "tourist/profile",
        element: <ManageProfileTourist />,
      },
      {
        path: "tourist/bookings",
        element: <MyBookings />,
      },
      {
        path: "tourist/add-story",
        element: <AddStoryTourist />,
      },
      {
        path: "tourist/manage-stories",
        element: <ManageStoriesTourist />,
      },
      {
        path: 'tourist/edit-story/:id',
        element: <EditStoryTourist />,
      },
      {
        path: "tourist/join-as-guide",
        element: <JoinAsTourGuide />,
      },

      // Tour Guide Routes
      {
        path: "tour-guide/profile",
        element: <ManageProfileTourGuide />,
      },
      {
        path: "tour-guide/my-assigned-tours",
        element: <MyAssignedTours />,
      },

      // Admin Routes
      {
        path: "admin/profile",
        element: <ManageProfileAdmin />,
      },
      {
        path: "admin/manage-users",
        element: <ManageUsersAdmin />,
      },
      {
        path: "admin/manage-candidates",
        element: <ManageCandidatesAdmin />,
      },
      {
        path: "admin/manage-bookings",
        element: <ManageBookings />,
      },
      {
        path: "admin/add-package",
        element: <AddPackageAdmin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster></Toaster>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
