// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, sendEmailVerification,
} from 'firebase/auth';

import {
  getDatabase, ref, onValue, query, orderByChild, limitToFirst, limitToLast, equalTo, get, child,
} from 'firebase/database';

// Staging config
const firebaseConfig = {
  apiKey: 'AIzaSyBFEYNRydjOd6rLyMPylztmevWoH-ZVsfQ',
  authDomain: 'denis-portfolio.firebaseapp.com',
  databaseURL: 'https://denis-portfolio.firebaseio.com',
  projectId: 'denis-portfolio',
  storageBucket: 'denis-portfolio.appspot.com',
  messagingSenderId: '319086000852',
  appId: '1:319086000852:web:545d89481aad3093a91941',
  measurementId: 'G-CN0627RCGR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {
  app,
  analytics,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  limitToFirst,
  limitToLast,
  equalTo,
  get,
  child,
};
