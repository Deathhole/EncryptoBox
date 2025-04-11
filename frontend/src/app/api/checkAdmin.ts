import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const checkIfAdmin = async (email: string): Promise<boolean> => {
  if (!email) return false;

  try {
    const docRef = doc(db, "admins", email);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() && docSnap.data().role === "admin";
  } catch (error) {
    console.error("Error checking admin role:", error);
    return false;
  }
};
