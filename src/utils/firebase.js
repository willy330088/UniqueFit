import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBaqodtY0fD_qxjjma_vm348kFyujqlNOg",
  authDomain: "uniquefit-william.firebaseapp.com",
  projectId: "uniquefit-william",
  storageBucket: "uniquefit-william.appspot.com",
  messagingSenderId: "816683170232",
  appId: "1:816683170232:web:11b8f9e861b2a8ce64774d"
};

initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password);
}

export function logIn(email, password) {
  signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  signOut(auth);
}

export function subscribeToUser(callback) {
  onAuthStateChanged(auth, callback);
}

export async function fetchClocks() {
  const userRef = doc(db, `users/${auth.currentUser.uid}`);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data().clocks;
  } else {
    return [];
  }
}

export async function addClock(timezone) {
  const userRef = doc(db, `users/${auth.currentUser.uid}`);

  await setDoc(
    userRef,
    {
      clocks: arrayUnion(timezone),
    },
    { merge: true }
  );
}

export async function removeClock(timezone) {
  const userRef = doc(db, `users/${auth.currentUser.uid}`);

  await updateDoc(userRef, {
    clocks: arrayRemove(timezone),
  });
}
