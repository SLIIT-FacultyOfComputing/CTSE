// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKqEhkAzDPGu7jgIXq5rm7ZMo2sf96-qA",
  authDomain: "react-app-new-135fc.firebaseapp.com",
  databaseURL: "https://react-app-new-135fc-default-rtdb.firebaseio.com",
  projectId: "react-app-new-135fc",
  storageBucket: "react-app-new-135fc.appspot.com",
  messagingSenderId: "1086012028589",
  appId: "1:1086012028589:web:8311612d57cbbfc4fab824"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)