import firebase from "firebase/compat/app";
// import firebase from 'firebase/app';
import {initializeApp} from 'firebase/app';

// import 'firebase/firestore';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import {getFirestore, setDoc} from 'firebase/firestore';
import {doc, getDoc} from 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_authDomain,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_messagingSenderId,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_appId
  };


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = doc(db, `users/${userAuth.uid }`)
  
  const snapShot = await getDoc(userRef);
  // const snapShot = await userRef.get()
  // console.log(snapShot)
  if (!snapShot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef,{
        displayName,
        email,
        createdAt,
        ...additionalData
      })
      
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;
}

const app = initializeApp(config)

// export const auth = app.auth();
export const auth = getAuth(app)

// export const firestore = app.firestore();
export const db = getFirestore(app);

// const provider = new app.auth.GoogleAuthProvider();
const provider = new GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;