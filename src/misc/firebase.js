import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDcH1fvjmLM_CHqz22K7Pf5IUr87UWmJ48",
  authDomain: "chat-app-dc4fb.firebaseapp.com",
  databaseURL: "https://chat-app-dc4fb.firebaseio.com",
  projectId: "chat-app-dc4fb",
  storageBucket: "chat-app-dc4fb.appspot.com",
  messagingSenderId: "537185383205",
  appId: "1:537185383205:web:bb4d82e9094fa73da2a0cc",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
