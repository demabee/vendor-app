// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkePGxMHhHb8NML5RL1XQfjBYSuBnnxB8",
  authDomain: "vendor-app-e8ed9.firebaseapp.com",
  projectId: "vendor-app-e8ed9",
  storageBucket: "vendor-app-e8ed9.appspot.com",
  messagingSenderId: "374089036642",
  appId: "1:374089036642:web:994c0bd4cf1219ecde323b",
  measurementId: "G-7RFM3CQEB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };