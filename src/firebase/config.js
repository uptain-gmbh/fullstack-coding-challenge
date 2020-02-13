import firebase from 'firebase'
import firestore from "firebase/firestore"
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDpTNWNJCNJ4hdWK9xt3ZChuahrkZOVEkw",
    authDomain: "todolist-376ca.firebaseapp.com",
    databaseURL: "https://todolist-376ca.firebaseio.com",
    projectId: "todolist-376ca",
    storageBucket: "todolist-376ca.appspot.com",
    messagingSenderId: "488378618693",
    appId: "1:488378618693:web:557eee27026ea1f260242c",
    measurementId: "G-PE9DDWYGXB"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({timestampsInSnapshots:true})
  var storage = firebase.storage();
  export default firebaseApp.firestore()