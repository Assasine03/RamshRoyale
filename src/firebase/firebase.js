import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

function FireBaseInit(){
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
    const analytics = getAnalytics(app);
    //console.log(analytics)

    signInWithPopup(auth, new GoogleAuthProvider())
    const auth = getAuth(app);
    onAuthStateChanged(auth , user => {
      console.log("You are logged in as", user);
    })
}