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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const userRef = firestore.doc(`users/1230sajadmdaswu`);
  // console.log(userRef)
  const snapShot = await userRef.get();
  // console.log(snapShot)

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    // console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}; 

export const convertCollectionsSnapshotToMap = collections => {
    // console.log(collections.docs)
    const transformedCollection = collections.docs.map(doc => {
    // console.log(doc.data())
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };

  });
  // console.log(collections.docs)

  console.log("Zdravo", transformedCollection)
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {}); 
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;