
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyBLQ2PA_hlvZou-WIGuMlKyGZfKgKTJLJE",
  authDomain: "chatter-fafde.firebaseapp.com",
  projectId: "chatter-fafde",
  storageBucket: "chatter-fafde.appspot.com",
  messagingSenderId: "472977335151",
  appId: "1:472977335151:web:7220f22c7fc27efe563e9a"
=======
  apiKey: "AIzaSyC9x8CJS_J4zs6xYJZUTiVUpPiB-WEfH-Q",
  authDomain: "chatting-dc95b.firebaseapp.com",
  projectId: "chatting-dc95b",
  storageBucket: "chatting-dc95b.appspot.com",
  messagingSenderId: "837519179798",
  appId: "1:837519179798:web:979e6ce96b9f1530ff3537"
>>>>>>> 9078cd4df3728d22a42f5e4a72ec28ca5632f818
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const storage= getStorage();
export const db = getFirestore();
