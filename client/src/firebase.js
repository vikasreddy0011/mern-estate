// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBAE_API_KEY,
  authDomain: "mern-estate-99175.firebaseapp.com",
  projectId: "mern-estate-99175",
  storageBucket: "mern-estate-99175.appspot.com",
  messagingSenderId: "460643768438",
  appId: "1:460643768438:web:212f5a4d8ea0b48938e757"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);