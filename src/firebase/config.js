import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "to-do-a5e8c.firebaseapp.com",
    projectId: "to-do-a5e8c",
    storageBucket: "to-do-a5e8c.appspot.com",
    messagingSenderId: "595156914163",
    appId: "1:595156914163:web:540bbf8fbbf85ed2c3cc86"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // 
  const db = getFirestore(app);

  export default db;