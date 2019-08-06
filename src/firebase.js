import firebase from 'firebase';

const config = {
  "apiKey": "AIzaSyAylGcQNfrdSkT_m0345kErlcIx6Fgqkls",
  "databaseURL": "https://idea-expander.firebaseio.com",
  "storageBucket": "idea-expander.appspot.com",
  "authDomain": "idea-expander.firebaseapp.com",
  "messagingSenderId": "510689240514",
  "projectId": "idea-expander"
};
const firebaseApp = firebase.initializeApp(config);

export const auth = firebaseApp.auth();
export const db = firebaseApp.database();
