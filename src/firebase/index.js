// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr5KzAxUTlxRscUldHzroFcpJAGXtFvp8",
  authDomain: "chatapp-86305.firebaseapp.com",
  projectId: "chatapp-86305",
  storageBucket: "chatapp-86305.firebasestorage.app",
  messagingSenderId: "972060084482",
  appId: "1:972060084482:web:f3573ba2d332121079da1b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firebase auth hizmetlerine erişebilmek için kurulum
export const auth = getAuth(app);

//google auth hizmetini kullanabilmek için kurulum

export const provider = new GoogleAuthProvider();
