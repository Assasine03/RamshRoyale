// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInAnonymously, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1mUSnoAU56SpLnxMDLIW6-bDK5orpgrw",
  authDomain: "ramschroyal.firebaseapp.com",
  projectId: "ramschroyal",
  storageBucket: "ramschroyal.appspot.com",
  messagingSenderId: "407442902464",
  appId: "1:407442902464:web:6d2db255534bbcd092cc25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Email/Password Sign-in function
export const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in with email and password:", userCredential);
    return userCredential;
  } catch (error) {
    console.error("Error during email/password sign in:", error);
    throw error;
  }
};

// Anonymous Sign-in function
export const signInAnonymouslyUser = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("User signed in anonymously:", userCredential);
    return userCredential;
  } catch (error) {
    console.error("Error during anonymous sign in:", error);
    throw error;
  }
};

// Sign-out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};
