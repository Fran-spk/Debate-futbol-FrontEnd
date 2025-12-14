// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFY8o7qi3cNjWAEBV5dmJ2lusznwNbucg",
  authDomain: "debate-futbol.firebaseapp.com",
  projectId: "debate-futbol",
  storageBucket: "debate-futbol.firebasestorage.app",
  messagingSenderId: "362596702090",
  appId: "1:362596702090:web:c60c36a04f833f6c2c5a73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Exportar auth y googleprovider

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
