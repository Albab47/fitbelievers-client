import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import axios from "axios";
// Firebase Auth
const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // Register new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const loginWithGoogle = () => {
    setLoading(true);
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Logout user
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('access-token')
    return signOut(auth);
  };

  // Get token from server
  const getToken = async (email) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
      email,
    });
    localStorage.setItem('access-token', data.token);
  };

  // Save User
  // const saveUser = async (currentUser) => {
  //   // TODO: post user info to db
  //   console.log(currentUser);
  //   const user = {
  //     email: currentUser?.email,
  //     role: "member",
  //     status: "verified",
  //   };
  //   const { data } = await axios.post(
  //     `${import.meta.env.VITE_API_URL}/users`,
  //     user
  //   );
  //   console.log(data);
  // };

  // Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user -->", currentUser);
      if (currentUser) {
        getToken(currentUser.email);
        // saveUser(currentUser);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    loading,
    setLoading,
    createUser,
    user,
    signIn,
    loginWithGoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
