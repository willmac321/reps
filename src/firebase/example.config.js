import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth } from "firebase/auth";

const firebaseConfig = {
};

const firebase = initializeApp(firebaseConfig);

// if using mobile do this
import AsyncStorage from "@react-native-async-storage/async-storage";
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});


const auth = getAuth(firebase);

const db = getFirestore(firebase);

const fieldValue = db.FieldValue;

export { firebase, db, auth, fieldValue };
