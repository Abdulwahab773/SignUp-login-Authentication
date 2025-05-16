import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, sendEmailVerification, deleteUser  } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";



const firebaseConfig = {
    apiKey: "AIzaSyBcNf9M2YDgZNiSE3-O99Y_U1gKX-2IWQs",
    authDomain: "login-signup-f44fc.firebaseapp.com",
    projectId: "login-signup-f44fc",
    storageBucket: "login-signup-f44fc.firebasestorage.app",
    messagingSenderId: "1016298576093",
    appId: "1:1016298576093:web:40d88076d205ca61e6a334",
    measurementId: "G-5QNMBHYYWG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
    createUserWithEmailAndPassword,
    auth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    signInWithPopup,
    sendEmailVerification,
    deleteUser,
    GoogleAuthProvider,
    provider  
}