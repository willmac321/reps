import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyByMocp_NYOYSMcC7oUCjLvfFE_Xob4fxA",
  authDomain: "reps-app-7c3fe.firebaseapp.com",
  databaseURL: "https://reps-app-7c3fe-default-rtdb.firebaseio.com",
  projectId: "reps-app-7c3fe",
  storageBucket: "reps-app-7c3fe.appspot.com",
  messagingSenderId: "64569386037",
  appId: "1:64569386037:web:586b4c793ff997df753d7c",
  measurementId: "G-2KRR38R3WT",
};

const firebase = initializeApp(firebaseConfig);

const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(firebase);

const fieldValue = db.FieldValue;

export { firebase, db, auth, fieldValue };
