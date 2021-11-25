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
const workoutRef = firebase.firestore().collection('workouts');
const batch = firebase.firestore().batch();

const userPhotoFileRef = firebase
  .storage()
  .ref('user-photos/' + firebase.auth().currentUser?.uid);

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

function updateUserName(name) {
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

async function createWorkout(
  videoFile,
  metadata,
  title,
  description,
  targetMuscleGroup,
  type
) {
  const workoutDocRef = workoutRef.doc();
  const workoutVideoFileRef = firebase
    .storage()
    .ref('workout-videos/' + workoutDocRef.id);
  await workoutVideoFileRef.put(videoFile, metadata);
  const workoutVideoURL = await workoutVideoFileRef.getDownloadURL();
  await workoutDocRef.set({
    title: title,
    publisher: firebase.auth().currentUser.uid,
    description: description,
    targetMuscleGroup: targetMuscleGroup,
    type: type,
    collectedBy: [],
    videoURL: workoutVideoURL,
    createdAt: firebase.firestore.Timestamp.now(),
  });
}

async function editWorkout(
  videoFile,
  metadata,
  title,
  description,
  targetMuscleGroup,
  type,
  workoutId
) {
  const workoutDocRef = workoutRef.doc(workoutId);
  const workoutVideoFileRef = firebase
    .storage()
    .ref('workout-videos/' + workoutId);
  if (videoFile === '') {
    await workoutDocRef.update({
      title: title,
      description: description,
      targetMuscleGroup: targetMuscleGroup,
      type: type,
    });
  } else {
    await workoutVideoFileRef.put(videoFile, metadata);
    const workoutVideoURL = await workoutVideoFileRef.getDownloadURL();
    await workoutDocRef.update({
      title: title,
      description: description,
      targetMuscleGroup: targetMuscleGroup,
      type: type,
      videoURL: workoutVideoURL,
    });
  }
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

function deleteWorkoutComment(workoutId, commentId) {
  const workoutIdRef = workoutRef.doc(workoutId);
  batch.update(workoutIdRef, {
    commentsCount: firebase.firestore.FieldValue.increment(-1),
  });

  const commentRef = workoutIdRef.collection('comments').doc(commentId);
  batch.delete(commentRef);

  return batch.commit();
}

function editWorkoutComment(workoutId, commentId, commentContent) {
  return workoutRef
    .doc(workoutId)
    .collection('comments')
    .doc(commentId)
    .update({
      content: commentContent,
    });
}

function deletePlanComment(planId, commentId) {
  const planIdRef = planRef.doc(planId);
  batch.update(planIdRef, {
    commentsCount: firebase.firestore.FieldValue.increment(-1),
  });

  const commentRef = planIdRef.collection('comments').doc(commentId);
  batch.delete(commentRef);

  return batch.commit();
}

function editPlanComment(planId, commentId, commentContent) {
  return planRef.doc(planId).collection('comments').doc(commentId).update({
    content: commentContent,
  });
}

function getWorkoutComment(workoutId, setComments) {
  workoutRef
    .doc(workoutId)
    .collection('comments')
    .orderBy('createdAt', 'desc')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        const id = doc.id;
        return { ...doc.data(), id };
      });
      setComments(data);
    });
}

function addWorkoutComment(workoutId, commentContent) {
  const workoutIdRef = workoutRef.doc(workoutId);
  batch.update(workoutIdRef, {
    commentsCount: firebase.firestore.FieldValue.increment(1),
  });
  const commentRef = workoutIdRef.collection('comments').doc();
  batch.set(commentRef, {
    content: commentContent,
    createdAt: firebase.firestore.Timestamp.now(),
    publisher: firebase.auth().currentUser.uid,
  });
  return batch.commit();
}

function removeWorkoutCollection(workoutId, userId) {
  return workoutRef.doc(workoutId).update({
    collectedBy: firebase.firestore.FieldValue.arrayRemove(userId),
  });
}

function addWorkoutCollection(workoutId, userId) {
  return workoutRef.doc(workoutId).update({
    collectedBy: firebase.firestore.FieldValue.arrayUnion(userId),
  });
}

function getPlanComment(planId, setComments) {
  planRef
    .doc(planId)
    .collection('comments')
    .orderBy('createdAt', 'desc')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        const id = doc.id;
        return { ...doc.data(), id };
      });
      setComments(data);
    });
}

function addPlanComment(planId, commentContent) {
  const planIdRef = planRef.doc(planId);
  batch.update(planIdRef, {
    commentsCount: firebase.firestore.FieldValue.increment(1),
  });
  const commentRef = planIdRef.collection('comments').doc();
  batch.set(commentRef, {
    content: commentContent,
    createdAt: firebase.firestore.Timestamp.now(),
    publisher: firebase.auth().currentUser.uid,
  });
  return batch.commit();
}

function removePlanCollection(planId, userId) {
  return planRef.doc(planId).update({
    collectedBy: firebase.firestore.FieldValue.arrayRemove(userId),
  });
}

function addPlanCollection(planId, userId) {
  return planRef.doc(planId).update({
    collectedBy: firebase.firestore.FieldValue.arrayUnion(userId),
  });
}

function uploadUserPhoto(photoFile, metadata) {
  return userPhotoFileRef.put(photoFile, metadata);
}

function getUserPhotoURL() {
  return userPhotoFileRef.getDownloadURL();
}

function updateUserPhotoAndName(userName, imageURL) {
  return firebase.auth().currentUser.updateProfile({
    displayName: userName,
    photoURL: imageURL,
  });
}

function updateUserInfo(userName, imageURL) {
  if (imageURL) {
    return userRef.doc(firebase.auth().currentUser.uid).update({
      displayName: userName,
      photoURL: imageURL,
    });
  } else {
    return userRef.doc(firebase.auth().currentUser.uid).update({
      displayName: userName,
    });
  }
}

export {
  firebase,
  facebookProvider,
  googleProvider,
  socialMediaAuth,
  setSocialMediaUserData,
  nativeUserSignUp,
  updateUserName,
  setNativeUserData,
  nativeSignIn,
  createWorkout,
  editWorkout,
  createPlan,
  editPlan,
  deleteWorkoutComment,
  editWorkoutComment,
  deletePlanComment,
  editPlanComment,
  getWorkoutComment,
  addWorkoutComment,
  removeWorkoutCollection,
  addWorkoutCollection,
  getPlanComment,
  addPlanComment,
  removePlanCollection,
  addPlanCollection,
  uploadUserPhoto,
  getUserPhotoURL,
  updateUserPhotoAndName,
  updateUserInfo,
};
