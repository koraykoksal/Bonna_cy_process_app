
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnaKzV29PH8bNBtCOkxIAfZde37_Au6Ro",
  authDomain: "cy-proses-5e48a.firebaseapp.com",
  projectId: "cy-proses-5e48a",
  storageBucket: "cy-proses-5e48a.appspot.com",
  messagingSenderId: "1058605013077",
  appId: "1:1058605013077:web:9e031d0200a501ae00dcdc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);