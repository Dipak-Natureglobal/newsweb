import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

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
const app=initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const googleProvider= new GoogleAuthProvider(app);
