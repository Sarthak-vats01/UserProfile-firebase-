// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQTy-q7on1mPytr_jpLQqeb_xLx3gPVPs",
  authDomain: "tapopassignment-a5633.firebaseapp.com",
  projectId: "tapopassignment-a5633",
  storageBucket: "tapopassignment-a5633.appspot.com",
  messagingSenderId: "140995503653",
  appId: "1:140995503653:web:834a12fcf65bb8527701cc",
  measurementId: "G-3PYNN69BKH",
  databaseURL:
    "https://tapopassignment-a5633-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const fireDB = getFirestore(app);
const fireStorage = getStorage(app);

export { app, auth, fireDB, fireStorage };
