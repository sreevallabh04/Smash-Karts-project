// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwmmEtiME1GQMgACY_hyroxIXPbO7Oy0Y",
  authDomain: "smash-karts-tracker.firebaseapp.com",
  projectId: "smash-karts-tracker",
  storageBucket: "smash-karts-tracker.firebasestorage.app",
  messagingSenderId: "23218601698",
  appId: "1:23218601698:web:e8e9413c69d7d62829e8bb",
  measurementId: "G-ZR0R3WY4MF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);