import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBAqNQ_ZB3ynQftEcJmwr9VCBzng7ldASE",
    authDomain: "disneyplus-clone-90530.firebaseapp.com",
    projectId: "disneyplus-clone-90530",
    storageBucket: "disneyplus-clone-90530.appspot.com",
    messagingSenderId: "325885414049",
    appId: "1:325885414049:web:07daac5a19df03215bbee0",
    measurementId: "G-9NJ71SQ8VN"
  };
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth =firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();
  const storage= firebase.storage();


  export {auth,provider,storage}
  export default db;