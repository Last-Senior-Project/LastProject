import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCfsfkxIkrke-lVEQ9blR6XnO7usAotgzk",
  authDomain: "freelance-813a0.firebaseapp.com",
  projectId: "freelance-813a0",
  storageBucket: "freelance-813a0.appspot.com",
  messagingSenderId: "689095471709",
  appId: "1:689095471709:web:9bce1726f2a9f1a58413b4",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const authentication = firebase.auth();
const storage = firebase.storage();
export { firebase, authentication, db ,storage};