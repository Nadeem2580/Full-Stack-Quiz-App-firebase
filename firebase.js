import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

// Auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

//  Firestore
import { getFirestore, doc, updateDoc, setDoc, getDoc, addDoc, collection, getDocs,query, where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCMN5UUP-fAZFqAiOztTit9xP9qiFMH7_Y",
    authDomain: "smit-practice-new.firebaseapp.com",
    projectId: "smit-practice-new",
    storageBucket: "smit-practice-new.firebasestorage.app",
    messagingSenderId: "344883956867",
    appId: "1:344883956867:web:1e210f9c6227ecff649fb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
    signInWithEmailAndPassword,
    getDoc,
    addDoc, collection,
    getDocs,
    updateDoc,
     onAuthStateChanged,
    query, where,
   
}
