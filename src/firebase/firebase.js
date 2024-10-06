// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInAnonymously, signOut } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
//import {testDB } from './database.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1mUSnoAU56SpLnxMDLIW6-bDK5orpgrw",
  authDomain: "ramschroyal.firebaseapp.com",
  projectId: "ramschroyal",
  storageBucket: "ramschroyal.appspot.com",
  messagingSenderId: "407442902464",
  appId: "1:407442902464:web:6d2db255534bbcd092cc25",
};

var userData = {
  uid: "",
  accessToken: "",
  email: "",
  isAnonymous: "",
  loggedIn: false,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

function ChangeLocalUserCredentials(userCredential){
  var user = userCredential.user
  userData.uid = user.uid
  userData.email = user.email
  userData.isAnonymous = user.isAnonymous
  userData.accessToken = user.accessToken
  userData.loggedIn = true
}

function ClearLocalUserCredentials(){
  userData = {
    uid: "",
    accessToken: "",
    email: "",
    isAnonymous: "",
    loggedIn: false,
  }
}

// Email/Password Sign-in function
export const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in with email and password:", userCredential);
    ChangeLocalUserCredentials(userCredential)
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
    ChangeLocalUserCredentials(userCredential)
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
    ClearLocalUserCredentials()
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};

// Google Sign-in function (optional, in case you want to add this in the future)
export const signInWithGoogle = async () => {
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

export function GetUserData (){
  return userData;
}