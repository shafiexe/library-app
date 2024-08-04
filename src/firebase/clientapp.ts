import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwgSzKbp1Rej0YQORMYMf_Bn5kL4-mJIE",
  authDomain: "library-app-60c55.firebaseapp.com",
  projectId: "library-app-60c55",
  storageBucket: "library-app-60c55.appspot.com",
  messagingSenderId: "462823661608",
  appId: "1:462823661608:web:defce1a1ba1694305e551d",
  // measurementId: "G-R571Y2LJPY"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, doc, deleteDoc, where, query };
