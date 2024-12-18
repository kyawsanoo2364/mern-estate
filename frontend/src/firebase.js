// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-be904.firebaseapp.com",
  projectId: "mern-estate-be904",
  storageBucket: "mern-estate-be904.firebasestorage.app",
  messagingSenderId: "717108674900",
  appId: "1:717108674900:web:ed5636edb8406ddde748c1",
  measurementId: "G-ZW6ZQQHEZB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
