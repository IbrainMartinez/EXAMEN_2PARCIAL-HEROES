import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyACun1Er1yhwOPHXU17e0zVXj0zeOhseMs",
  authDomain: "examen-9f662.firebaseapp.com",
  projectId: "examen-9f662",
  storageBucket: "examen-9f662.appspot.com",
  messagingSenderId: "550013564173",
  appId: "1:550013564173:web:c54e4c53e4df08a5f8ac44"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)