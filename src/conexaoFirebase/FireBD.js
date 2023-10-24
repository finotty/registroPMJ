import { initializeApp } from "firebase/app";
//seu banco
const firebaseConfig = {
    apiKey: "AIzaSyDZdfBHc6Ax9so-d689YhHebLR2-N-Qd28",
    authDomain: "registropmj-f567a.firebaseapp.com",
    projectId: "registropmj-f567a",
    storageBucket: "registropmj-f567a.appspot.com",
    messagingSenderId: "1006929422469",
    appId: "1:1006929422469:web:9809b8b6c2c9d9a0f8e1ec"
};

// Initialize Firebase
const bank = initializeApp(firebaseConfig);
export default bank;
