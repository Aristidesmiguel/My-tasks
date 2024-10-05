import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtkWvUqfjgGVkZ4Kw6TtZrXsQk4a2_V2s",
    authDomain: "to-do-list-c0cab.firebaseapp.com",
    projectId: "to-do-list-c0cab",
    storageBucket: "to-do-list-c0cab.appspot.com",
    messagingSenderId: "256957965874",
    appId: "1:256957965874:web:3bf950ab61c25e6ac1be2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
