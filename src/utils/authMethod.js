import firebase from "./firebase"
import 'firebase/auth'
export const facebookProvider = new firebase.auth.FacebookAuthProvider()
export const googleProvider = new firebase.auth.GoogleAuthProvider()