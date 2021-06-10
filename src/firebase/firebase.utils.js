import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAYUL8HKyeaIC0b0r7PDF5FBJFOAmRSDZU",
  authDomain: "crwn-db-72e2a.firebaseapp.com",
  projectId: "crwn-db-72e2a",
  storageBucket: "crwn-db-72e2a.appspot.com",
  messagingSenderId: "743998236484",
  appId: "1:743998236484:web:ce05f9f6b44f80a274d911",
  measurementId: "G-5WX6XWR89G"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;