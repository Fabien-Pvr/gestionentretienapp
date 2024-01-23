import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBPklJ9AQXYx-10Q_0zp3aB8fluu2AwJt8",
    authDomain: "p2i-gestionentretien.firebaseapp.com",
    projectId: "p2i-gestionentretien",
    storageBucket: "p2i-gestionentretien.appspot.com",
    messagingSenderId: "107043973754",
    appId: "1:107043973754:web:0409b9fd1419cf2b8729c3",
    measurementId: "G-3M1DPRKYK9"};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };