import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { app } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create userWith Email & Password
  const createUserWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // create userWith Google
  const createUserWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //  Login User
  const LogIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logOut = () => {
    return signOut(auth);
  };

  // update user
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authdata = {
    createUserWithEmail,
    createUserWithGmail,
    LogIn,
    logOut,
    user,
    setUser,
    updateUser,
    loading,
    setLoading,
  };

  return (
    <div>
      <AuthContext.Provider value={authdata}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
