import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let db = null;
let bucket = null;

// Check if Firebase credentials are provided
const hasFirebaseConfig = process.env.FIREBASE_PROJECT_ID && 
                          process.env.FIREBASE_PROJECT_ID !== 'demo-project' &&
                          process.env.FIREBASE_PRIVATE_KEY && 
                          process.env.FIREBASE_CLIENT_EMAIL;

if (hasFirebaseConfig) {
  // Initialize Firebase Admin with real credentials
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
  }

  db = admin.firestore();
  bucket = admin.storage().bucket();
  console.log('✅ Firebase initialized with real credentials');
} else {
  console.log('⚠️  Firebase not configured - using demo mode (upload/order features will not work)');
  console.log('   To enable Firebase, add your credentials to .env file');
}

export { admin, db, bucket };

