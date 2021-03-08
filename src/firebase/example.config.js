import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const fieldValue = firebase.firestore.FieldValue;
const fieldPath = firebase.firestore.FieldPath;

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// this only needs to be done for web
firebase
  .firestore()
  .enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // multiple tabs open, can only do this once per instance
    } else if (err.code === 'unimplemented') {
      // feautre not supported for offline storage
    }
  });

export { firebase, db, fieldValue, fieldPath };
