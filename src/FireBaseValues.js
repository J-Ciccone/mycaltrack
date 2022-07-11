import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database"
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCkQQSf8A9aaQVriEuHfFGc-yFFyWQYfPY",
  authDomain: "calpal-1776.firebaseapp.com",
  databaseURL: "https://calpal-1776-default-rtdb.firebaseio.com",
  projectId: "calpal-1776",
  storageBucket: "calpal-1776.appspot.com",
  messagingSenderId: "131179602383",
  appId: "1:131179602383:web:d53ada04bbe0dd348032ba",
};

// Initialize Firebase
export const MyFireApp = initializeApp(firebaseConfig);
export const MyFireStore = getFirestore(MyFireApp);
export const MyRTDS = getDatabase();




