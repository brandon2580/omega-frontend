// This import loads the firebase namespace.
import firebase from 'firebase/app';

import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmZ6sRl25sUFktUwgNvodtiHiOnGXdhSc",
  authDomain: "sigma7-98683.firebaseapp.com",
  projectId: "sigma7-98683",
  storageBucket: "sigma7-98683.appspot.com",
  messagingSenderId: "542352225732",
  appId: "1:542352225732:web:d60a7dae42a8c715dde091",
  measurementId: "G-WT41V78V2P",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;
