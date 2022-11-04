
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9x8CJS_J4zs6xYJZUTiVUpPiB-WEfH-Q",
  authDomain: "chatting-dc95b.firebaseapp.com",
  projectId: "chatting-dc95b",
  storageBucket: "chatting-dc95b.appspot.com",
  messagingSenderId: "837519179798",
  appId: "1:837519179798:web:979e6ce96b9f1530ff3537"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const storage= getStorage();
export const db = getFirestore();
