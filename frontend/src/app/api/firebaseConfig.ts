import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

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
const provider = new GoogleAuthProvider();

// Function to handle Google sign-in
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in:", user);
    
    // Save the user info to Firestore using modular API
    const userRef = doc(collection(db, "users"), user.uid); // Access the 'users' collection and document by user ID
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
    
    // Redirect to a dashboard or another page after successful sign-in (optional)
    // window.location.href = "/dashboard"; 
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
};

// Expose the necessary methods to other parts of your app
export { auth, db, provider, signInWithGoogle };
