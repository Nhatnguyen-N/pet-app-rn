// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-88ff1.firebaseapp.com",
  projectId: "pet-adopt-88ff1",
  storageBucket: "pet-adopt-88ff1.firebasestorage.app",
  messagingSenderId: "344379340515",
  appId: "1:344379340515:web:d69c92dd1e55fa9b71b7d6",
  measurementId: "G-0YYK2W8M0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
// const analytics = getAnalytics(app);