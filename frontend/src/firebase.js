import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzViz_PD7zZI1MbsDFF4gvqn7l_t5vIXY",
  authDomain: "agrovision-3453f.firebaseapp.com",
  projectId: "agrovision-3453f",
  storageBucket: "agrovision-3453f.firebasestorage.app",
  messagingSenderId: "770941713090",
  appId: "1:770941713090:web:1896cefa3719eaaa86595b",
  measurementId: "G-S618MGQPZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Authentication functions
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const submitInquiry = async (name, email, subject, message) => {
  try {
    await addDoc(collection(db, "inquiries"), {
      name,
      email,
      subject,
      message,
      timestamp: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return { success: false, error: error.message };
  }
};

export { auth, db, analytics };
export default app;






