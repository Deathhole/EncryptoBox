/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: "http://localhost:8000";
  readonly VITE_FIREBASE_API_KEY: "AIzaSyBd7GNaFzfpX3euKSa3ahLJnI-dOxV0oHA";
  readonly VITE_FIREBASE_AUTH_DOMAIN: "enceyptobox.firebaseapp.com";
  readonly VITE_FIREBASE_PROJECT_ID: "enceyptobox";
  readonly VITE_FIREBASE_STORAGE_BUCKET: "enceyptobox.firebasestorage.app";
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: "430443839084";
  readonly VITE_FIREBASE_APP_ID: "1:430443839084:web:b40c104e9fc562b0e0e249";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
