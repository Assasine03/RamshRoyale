import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import getAuth for authentication
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1mUSnoAU56SpLnxMDLIW6-bDK5orpgrw",
  authDomain: "ramschroyal.firebaseapp.com",
  projectId: "ramschroyal",
  storageBucket: "ramschroyal.appspot.com",
  messagingSenderId: "407442902464",
  appId: "1:407442902464:web:6d2db255534bbcd092cc25",
  measurementId: "G-P9VSRJ4Y6S",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  // Optional: can be removed if not used

// Initialize Auth
const auth = getAuth(app);

// Function to handle Google Sign-in
export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      console.log('User signed in:', result.user);
    })
    .catch((error) => {
      console.error('Error during sign in:', error);
    });
}

// Function to check for Auth state change
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
console.log("Works")
// Export the auth object
export { auth };
