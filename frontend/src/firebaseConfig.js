// src/firebase/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd7GNaFzfpX3euKSa3ahLJnI-dOxV0oHA",
  authDomain: "enceyptobox.firebaseapp.com",
  projectId: "enceyptobox",
  storageBucket: "enceyptobox.firebasestorage.app",
  messagingSenderId: "430443839084",
  appId: "1:430443839084:web:b40c104e9fc562b0e0e249",
  measurementId: "G-V8QL89YKC7",
};

// ✅ Initialize only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
