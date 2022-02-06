import {createContext, useState} from 'react';
import { auth } from '../firebase/config';


import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    signOut 
} from 'firebase/auth';

export const context = createContext();

export function AuthProvider({children}){

   const handleRegister = async (auth, email, password) =>{
    await createUserWithEmailAndPassword(auth, email, password)
   }

   const handleSignIn = async (auth, email, password) =>{
       await signInWithEmailAndPassword(auth, email, password)
   }


   const googleProvider = new GoogleAuthProvider();

   const handleSubmitGoogle = () =>{
    signInWithPopup(auth, googleProvider)
   }

   const passwordReset = (auth, email) =>{
    sendPasswordResetEmail(auth, email)
   }

   const signOutNow = (auth) =>{
    signOut(auth)
   }



   const [uid, setUid] = useState(null)
   const [user, setUser] = useState(null)


   onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUid(user.uid);
      setUser(user.displayName || user.email)
      
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

    return <context.Provider value={{handleRegister, handleSignIn, passwordReset, handleSubmitGoogle, googleProvider, signOutNow, uid, user}}>
        {children}
    </context.Provider>
};