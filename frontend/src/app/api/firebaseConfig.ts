import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd7GNaFzfpX3euKSa3ahLJnI-dOxV0oHA",
  authDomain: "enceyptobox.firebaseapp.com",
  projectId: "enceyptobox",
  storageBucket: "enceyptobox.firebasestorage.app",
  messagingSenderId: "430443839084",
  appId: "1:430443839084:web:b40c104e9fc562b0e0e249",
  measurementId: "G-V8QL89YKC7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
