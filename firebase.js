import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBU_y29XDFC-dlp0vQ4Ssgjr3URwdHm5mk",
  authDomain: "docs-b7a71.firebaseapp.com",
  projectId: "docs-b7a71",
  storageBucket: "docs-b7a71.appspot.com",
  messagingSenderId: "317101404022",
  appId: "1:317101404022:web:c8399183a42d31c89a1457"
};

const app = !firebase.apps.length 
    ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export { db };