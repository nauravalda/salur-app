import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBx_70G_nl632iEYAsASC_8Kopb3AGCYFM",
  authDomain: "salur-app.firebaseapp.com",
  projectId: "salur-app",
  storageBucket: "salur-app.appspot.com",
  messagingSenderId: "627135276395",
  appId: "1:627135276395:web:093fd440ccdc84e17c582e",
  measurementId: "G-0L59J0XELZ",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
// const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export {
  db,
  storage,
  // auth
};
