import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClOpwJy-OU8CpRz24TEAtkVP8yXzWVfzw",
  authDomain: "fullstacktutorial-695cc.firebaseapp.com",
  projectId: "fullstacktutorial-695cc",
  storageBucket: "fullstacktutorial-695cc.firebasestorage.app",
  messagingSenderId: "766651461289",
  appId: "1:766651461289:web:0ba95f67acfa81dc3cc3b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
