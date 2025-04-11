const admin = require("firebase-admin");


const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Replace with the actual UID of the user you want to promote
const uid = "dU2Qwrcn3wZsv754OBd4oHPmQBZ2";

admin
  .auth()
  .setCustomUserClaims(uid, { role: "admin" })
  .then(() => {
    console.log(`✅ Custom claim 'admin' set for user ${uid}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error setting custom claim:", error);
    process.exit(1);
  });
