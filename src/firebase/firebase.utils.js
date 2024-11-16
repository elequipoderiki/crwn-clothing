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
    apiKey: "AIzaSyCkSiT_0I8fWgoOkZjV5DEhtKiZHgEuF8c",
    authDomain: "crwn-db-97da4.firebaseapp.com",
    projectId: "crwn-db-97da4",
    storageBucket: "crwn-db-97da4.appspot.com",
    messagingSenderId: "269569018848",
    appId: "1:269569018848:web:51960783cbd06508e7f985"
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