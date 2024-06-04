
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDlabIpfKDOnSfqEphOujJW63rprRw_ZWQ",
  authDomain: "react-journal-app-6c734.firebaseapp.com",
  projectId: "react-journal-app-6c734",
  storageBucket: "react-journal-app-6c734.appspot.com",
  messagingSenderId: "926661534946",
  appId: "1:926661534946:web:d39e588ead0e8d001eeabb"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
