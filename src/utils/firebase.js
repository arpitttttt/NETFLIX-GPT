// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZmecQNptsohTW_bVli1WMjrdEd9Ojzbc",
  authDomain: "netflixgpt-b847b.firebaseapp.com",
  projectId: "netflixgpt-b847b",
  storageBucket: "netflixgpt-b847b.firebasestorage.app",
  messagingSenderId: "844182624865",
  appId: "1:844182624865:web:87ef47545242d89cc0e820",
  measurementId: "G-BW2PYGEW0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();