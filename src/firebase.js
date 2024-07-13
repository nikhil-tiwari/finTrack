// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWWSUlg-iHidL-bmi4fC4yyj6WYdsUq1o",
  authDomain: "personal-finance-tracker-2ddfa.firebaseapp.com",
  projectId: "personal-finance-tracker-2ddfa",
  storageBucket: "personal-finance-tracker-2ddfa.appspot.com",
  messagingSenderId: "670057252896",
  appId: "1:670057252896:web:39eb5d60bd36e271d9d445",
  measurementId: "G-7DS64CKBV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider };
