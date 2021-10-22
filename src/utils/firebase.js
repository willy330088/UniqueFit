import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBaqodtY0fD_qxjjma_vm348kFyujqlNOg",
  authDomain: "uniquefit-william.firebaseapp.com",
  projectId: "uniquefit-william",
  storageBucket: "uniquefit-william.appspot.com",
  messagingSenderId: "816683170232",
  appId: "1:816683170232:web:11b8f9e861b2a8ce64774d"
};

firebase.initializeApp(firebaseConfig)

export default firebase;