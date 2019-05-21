import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducers
import notifyReducer from "./Reducers/NotifyReducer";

const firebaseConfig = {
  apiKey: "AIzaSyDnTosnRAqB4rpgpTrA2e_VQYTlzOELvtw",
  authDomain: "anytime-library-atl.firebaseapp.com",
  databaseURL: "https://anytime-library-atl.firebaseio.com",
  projectId: "anytime-library-atl",
  storageBucket: "anytime-library-atl.appspot.com",
  messagingSenderId: "213608870534",
  appId: "1:213608870534:web:dac1b3960c6f2663"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore                                     ------> No longer required
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(reactReduxFirebase(firebase))
);

export default store;
