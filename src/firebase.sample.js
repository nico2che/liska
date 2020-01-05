import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const {
  REACT_APP_APIKEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER,
  REACT_APP_APP_ID
} = process.env;

const config = {
  apiKey: "" || REACT_APP_APIKEY,
  authDomain: "" || REACT_APP_AUTH_DOMAIN,
  databaseURL: "" || REACT_APP_DATABASE_URL,
  projectId: "" || REACT_APP_PROJECT_ID,
  storageBucket: "" || REACT_APP_STORAGE_BUCKET,
  messagingSenderId: "" || REACT_APP_MESSAGING_SENDER,
  appId: "" || REACT_APP_APP_ID
};

export default firebase.initializeApp(config);
