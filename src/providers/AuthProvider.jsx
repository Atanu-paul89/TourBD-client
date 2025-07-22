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
        // 1. User is logged in via Firebase. 
        try {

          const userDbSaveRes = await axios.post('https://tour-system-server.vercel.app/users', {
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          });

          // Request JWT from your backend
          const jwtRes = await axios.post('https://tour-system-server.vercel.app/jwt', {
            email: currentUser.email
          });

          // Store the JWT in localStorage
          if (jwtRes.data.token) {
            localStorage.setItem('access-token', jwtRes.data.token); 
          }

          // Fetch the full user data with role 
          const roleRes = await axios.get(`https://tour-system-server.vercel.app/users/email/${currentUser.email}`);

          setUser({
            ...currentUser,
            role: roleRes.data.role,
          });

        } catch (error) {
          console.error("Error during authentication flow (DB save/JWT/Role fetch):", error);

          localStorage.removeItem('access-token');
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {

        localStorage.removeItem('access-token'); 
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