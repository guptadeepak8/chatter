
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLQ2PA_hlvZou-WIGuMlKyGZfKgKTJLJE",
  authDomain: "chatter-fafde.firebaseapp.com",
  projectId: "chatter-fafde",
  storageBucket: "chatter-fafde.appspot.com",
  messagingSenderId: "472977335151",
  appId: "1:472977335151:web:7220f22c7fc27efe563e9a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const storage= getStorage();
export const db = getFirestore();