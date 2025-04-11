const admin = require("firebase-admin");

// Import your Firebase service account key
const serviceAccount = require("./path/to/serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;