import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkqQlT6tiVvpnSNkkxgCv-ANoKEZk0RQs",
  authDomain: "group-travel-app-5743e.firebaseapp.com",
  projectId: "group-travel-app-5743e",
  storageBucket: "group-travel-app-5743e.appspot.com",
  messagingSenderId: "792533972409",
  appId: "1:792533972409:web:296ffb14d2c172903a3268",
  measurementId: "G-T3YG1GHYSG",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
