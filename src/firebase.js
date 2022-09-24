
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAa2y4mByTkuB9I2BolwyTZyn_99caFIaI",
  authDomain: "chatter-9ddb9.firebaseapp.com",

  projectId: "chatter-9ddb9",
  storageBucket: "chatter-9ddb9.appspot.com",
  messagingSenderId: "1029606247132",
  appId: "1:1029606247132:web:13f34b44dd6969fbc78219"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const storage= getStorage();
export const db = getFirestore();