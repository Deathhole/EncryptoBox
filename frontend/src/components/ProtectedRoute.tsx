import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../app/api/firebaseConfig";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      console.log("🔍 Checking user...");

      if (!user) {
        console.log("❌ Not logged in");
        setRedirectTo("/login");
        setLoading(false);
        return;
      }

      console.log("✅ Logged in user:", user.uid);

      if (!user.emailVerified) {
        console.log("📧 Email not verified, redirecting to verify page");
        setRedirectTo("/verify-email");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("📄 Firestore user data:", userData);

          if (adminOnly && userData.role !== "admin") {
            console.log("⛔ Not an admin");
            setRedirectTo("/login");
          } else {
            console.log("✅ Authorized");
            setIsAuthorized(true);
          }
        } else {
          console.log("❌ User doc does not exist");
          setRedirectTo("/login");
        }
      } catch (error) {
        console.error("🔥 Error fetching user document:", error);
        setRedirectTo("/login");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [adminOnly]);

  if (loading) {
    console.log("⏳ Loading auth state...");
    return <div>Loading...</div>;
  }

  if (redirectTo) {
    console.log(`🚨 Redirecting to ${redirectTo}...`);
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  console.log("✅ User is authorized and email verified, rendering children");
  return <>{children}</>;
};

export default ProtectedRoute;
