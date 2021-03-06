import { createContext, useState } from "react";
import { auth } from "../firebase/config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

export const context = createContext();

export function AuthProvider({ children }) {
  const handleRegister = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const handleSignIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();

  const handleSubmitGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const passwordReset = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  const signOutNow = () => {
    signOut(auth);
  };

  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
      setUser(user.displayName || user.email);
    }
  });

  return (
    <context.Provider
      value={{
        handleRegister,
        handleSignIn,
        passwordReset,
        handleSubmitGoogle,
        googleProvider,
        signOutNow,
        uid,
        user,
      }}
    >
      {children}
    </context.Provider>
  );
}
