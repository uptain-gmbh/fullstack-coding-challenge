import firebase from 'firebase'
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBrYyHtAlrsOafMHRpC_Dx4qqMeukNiz_A",
  authDomain: "uptain-todo.firebaseapp.com",
  databaseURL: "https://uptain-todo.firebaseio.com",
  projectId: "uptain-todo",
  storageBucket: "uptain-todo.appspot.com",
  messagingSenderId: "450718067826",
  appId: "1:450718067826:web:d12ee7ee6c10b79463a6eb"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })
export default firebaseApp.firestore()