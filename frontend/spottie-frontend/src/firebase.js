// src/firebase.js
// ✅ Correct Order
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBWnRwYP8tDIoRsuOYJPFnqDyaOkNtl5gU",
  authDomain: "spottie-dc97c.firebaseapp.com",
  projectId: "spottie-dc97c",
  storageBucket: "spottie-dc97c.firebasestorage.app",
  messagingSenderId: "648183117594",
  appId: "1:648183117594:web:fa8826b904b70e66bcdea3"
};

// ❗️ Make sure this happens before calling getAuth
const app = initializeApp(firebaseConfig);

// ✅ Then get the auth instance
export const auth = getAuth(app);
