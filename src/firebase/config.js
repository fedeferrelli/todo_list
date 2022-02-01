import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };
  

 /*  REACT_APP_AUTHDOMAIN = to-do-a5e8c.firebaseapp.com
  REACT_APP_PROJECTID = to-do-a5e8c
  REACT_APP_STORAGEBUCKET = to-do-a5e8c.appspot.com
  REACT_APP_MESSAGINGSENDERID = 595156914163
  REACT_APP_APPID = 1:595156914163:web:540bbf8fbbf85ed2c3cc86

 */
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // 
  const db = getFirestore(app);

  export default db;