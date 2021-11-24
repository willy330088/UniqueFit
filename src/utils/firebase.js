import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

const userRef = firebase.firestore().collection('users');
const planRef = firebase.firestore().collection('plans');
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function socialMediaAuth(provider) {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    });
}

function setSocialMediaUserData(userData) {
  return userRef.doc(userData.uid).set({
    displayName: userData.displayName,
    photoURL: userData.photoURL,
  });
}

function nativeUserSignUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function updateNativeUserName(name) {
  return firebase.auth().currentUser.updateProfile({
    displayName: name,
  });
}

function setNativeUserData(user, name) {
  return userRef.doc(user.uid).set({
    displayName: name,
    photoURL: null,
  });
}

function nativeSignIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function createPlan(
  title,
  publicity,
  description,
  targetMuscleGroup,
  estimatedTrainingTime,
  plan
) {
  return planRef.doc().set({
    title: title,
    publisher: firebase.auth().currentUser.uid,
    public: publicity,
    description: description,
    targetMuscleGroup: targetMuscleGroup,
    estimatedTrainingTime: estimatedTrainingTime,
    workoutSet: plan.workoutSet.map((item) => {
      return {
        workoutId: item.workoutId,
        reps: item.reps,
        weight: item.weight,
        title: item.title,
      };
    }),
    collectedBy: [],
    createdAt: firebase.firestore.Timestamp.now(),
  });
}

function editPlan(
  title,
  publicity,
  description,
  targetMuscleGroup,
  estimatedTrainingTime,
  plan,
  planId
) {
  return planRef.doc(planId).update({
    title: title,
    public: publicity,
    description: description,
    targetMuscleGroup: targetMuscleGroup,
    estimatedTrainingTime: estimatedTrainingTime,
    workoutSet: plan.workoutSet.map((item) => {
      return {
        workoutId: item.workoutId,
        reps: item.reps,
        weight: item.weight,
        title: item.title,
      };
    }),
  });
}

export {
  firebase,
  facebookProvider,
  googleProvider,
  socialMediaAuth,
  setSocialMediaUserData,
  nativeUserSignUp,
  updateNativeUserName,
  setNativeUserData,
  nativeSignIn,
  createPlan,
  editPlan,
};
