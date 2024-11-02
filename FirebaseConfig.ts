import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD9fPizIUA2kMdqYnPaWBeDOe__mOP8x-M',
  authDomain: 'eduplanum-tcc.firebaseapp.com',
  projectId: 'eduplanum-tcc',
  storageBucket: 'eduplanum-tcc.appspot.com',
  messagingSenderId: '484987582661',
  appId: '1:484987582661:web:698c205f0c184197ced8ac',
  measurementId: 'G-PWHLF2XFV2',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
