import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

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
const analytics = getAnalytics(app); // You may not need this if you're not using analytics
const auth = getAuth(app);
console.log("Works")
// Function to handle sign in
function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('User signed in:', result.user);
    })
    .catch((error) => {
      console.error('Error during sign in:', error);
    });
}

// Function to check authentication state
function onAuthChange(callback) {
  onAuthStateChanged(auth, callback);
}


//signInWithGoogle()
