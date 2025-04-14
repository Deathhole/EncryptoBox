import React from 'react';
import { auth } from '../../src/firebaseConfig'; // adjust if needed
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const provider = new GoogleAuthProvider();

const LoginWithGoogle = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // ✅ Use environment variable for backend URL
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login-with-google`,
        {
          id_token: token,
        }
      );

      console.log("✅ Login successful:", response.data);
      // Optional: Save user data, redirect, etc.
    } catch (error) {
      console.error('❌ Google login error:', error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Continue with Google
    </button>
  );
};

export default LoginWithGoogle;
