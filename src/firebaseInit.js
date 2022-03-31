import { initializeApp } from "firebase/app";
// import firestore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcShLznbF_krQftGljpmZkKj2E7D5VXPA",
  authDomain: "todos-c0e9c.firebaseapp.com",
  projectId: "todos-c0e9c",
  storageBucket: "todos-c0e9c.appspot.com",
  messagingSenderId: "923069662248",
  appId: "1:923069662248:web:d98fcb00c03ff377efa11d",
};
const app = initializeApp(firebaseConfig);

// export firestore database
const db = getFirestore(app);
export { db };
