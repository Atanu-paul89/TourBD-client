import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { AuthContext } from './AuthContext';
import { auth } from '../utils/firebase';
import axios from 'axios';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // 1. Create User with Email and Password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Sign In User with Email and Password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. Sign In with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 4. Update User Profile (Name, Photo URL)
  const userUpdateProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    });
  };

  // 5. Reset Password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // 6. Sign Out User
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('access-token')
    return signOut(auth);
  };


  // --- On Auth State Change ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // console.log('Current User (Firebase):', currentUser);

      if (currentUser) {
        // 1. User is logged in via Firebase. Now, get/save user data in your DB and get JWT.
        try {
          // Post user data to your backend to save/check role.
          // This call now also triggers the JWT creation process on the backend.
          const userDbSaveRes = await axios.post('http://localhost:5000/users', {
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          });
          // console.log('Backend User Save/Check Response:', userDbSaveRes.data);

          // Request JWT from your backend
          const jwtRes = await axios.post('http://localhost:5000/jwt', {
            email: currentUser.email
          });
          // console.log('JWT Response:', jwtRes.data);

          // Store the JWT in localStorage
          if (jwtRes.data.token) {
            localStorage.setItem('access-token', jwtRes.data.token); // <--- Store the token
          }

          // Fetch the full user data with role from your backend (after JWT is stored)
          const roleRes = await axios.get(`http://localhost:5000/users/email/${currentUser.email}`);
          // console.log('Backend Role Fetch Response:', roleRes.data);

          setUser({
            ...currentUser,
            role: roleRes.data.role,
          });

        } catch (error) {
          console.error("Error during authentication flow (DB save/JWT/Role fetch):", error);
          // If any of these steps fail, clean up token and set user to null
          localStorage.removeItem('access-token');
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        // No user logged in or logged out
        localStorage.removeItem('access-token'); // <--- IMPORTANT: Ensure token is removed if no user
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);


  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    userUpdateProfile,
    resetPassword,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;