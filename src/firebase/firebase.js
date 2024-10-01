// firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInAnonymously, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';

// Firebase configuration (replace with your Firebase project credentials)
const firebaseConfig = {
  apiKey: "AIzaSyC1mUSnoAU56SpLnxMDLIW6-bDK5orpgrw",
  authDomain: "ramschroyal.firebaseapp.com",
  projectId: "ramschroyal",
  storageBucket: "ramschroyal.appspot.com",
  messagingSenderId: "407442902464",
  appId: "1:407442902464:web:6d2db255534bbcd092cc25",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export the auth object for use in other files

<<<<<<< Updated upstream
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

// Sign-out function (optional)
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};

// Google Sign-in function (optional, in case you want to add this in the future)
export const signInWithGoogle = async () => {
=======
// Initialize Auth
const auth = getAuth(app);
console.log(app)
// Function to handle Google Sign-in
function signInWithGoogle() {
>>>>>>> Stashed changes
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in with Google:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error during Google sign in:", error);
    throw error;
  }
};
