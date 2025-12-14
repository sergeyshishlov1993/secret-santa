import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCbDKhAItpEvZvLqK-Wx-bPXsLySCycm4c",
    authDomain: "secret-santa-464f8.firebaseapp.com",
    projectId: "secret-santa-464f8",
    storageBucket: "secret-santa-464f8.firebasestorage.app",
    messagingSenderId: "126886454446",
    appId: "1:126886454446:web:608f03fe3e2335ea31393f",
    measurementId: "G-3NMLB11LWR"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)