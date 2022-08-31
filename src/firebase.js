import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDR1tatcOFWjn7pojBALC2X8BbJlvlNDXU",
    authDomain: "incarto-43f1e.firebaseapp.com",
    projectId: "incarto-43f1e",
    storageBucket: "incarto-43f1e.appspot.com",
    messagingSenderId: "823539441122",
    appId: "1:823539441122:web:93be675155990ba74c6dbb",
    measurementId: "G-5V5RX8ZDZ4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.INCARTO_APP_FIREBASE_BUCKET_URL);

export default storage;