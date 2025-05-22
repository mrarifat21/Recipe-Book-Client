import React from 'react';
import { createContext } from 'react';
import { app } from '../firebase/firebase.init';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  

} from "firebase/auth";
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();
const auth =getAuth(app)

const AuthProvider = ({children}) => {
//   const [loading, setLoading] = useState(true);


     // create userWith Email & Password
  const createUserWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // create userWith Google
  const createUserWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //  Login User 
  const LogIn = (email, password) => {
   
    return signInWithEmailAndPassword(auth, email, password);
  };

  const authdata={
    createUserWithEmail,
    createUserWithGmail,
    LogIn
  }


    return (
        <div>
            <AuthContext.Provider value={authdata}>{children}</AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;