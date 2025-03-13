import { initializeApp } from "firebase/app";
//seu banco
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "9",
    appId: ""
};

// Initialize Firebase
const bank = initializeApp(firebaseConfig);
export default bank;
