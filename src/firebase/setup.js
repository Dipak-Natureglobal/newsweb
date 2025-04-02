import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0bIBQDkhGqU4IiseqVyO9mVYPizcfRCE",
  authDomain: "newsweb-a72d1.firebaseapp.com",
  projectId: "newsweb-a72d1",
  storageBucket: "newsweb-a72d1.firebasestorage.app",
  messagingSenderId: "320430645717",
  appId: "1:320430645717:web:be5161005f5200c8ef5d5c",
  measurementId: "G-QG9Y9XV026"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Set persistence mode to local (so session persists across page reloads)
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    // Handle errors here
    console.error("Error setting persistence:", error);
  });

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();
const database= getFirestore(app);

export {database, auth, googleProvider };
