import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA2AANduFpYcusKLJfk37Vocn2HEGd4Vy8",
  authDomain: "p2i-agricare.firebaseapp.com",
  projectId: "p2i-agricare",
  storageBucket: "p2i-agricare.appspot.com",
  messagingSenderId: "949014460068",
  appId: "1:949014460068:web:5fdeb712b8b50db28dd831",
  measurementId: "G-DHH2LV9LSW",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { db, auth, googleProvider, analytics };
