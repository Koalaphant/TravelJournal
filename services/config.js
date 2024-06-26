import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkqQlT6tiVvpnSNkkxgCv-ANoKEZk0RQs",
  authDomain: "group-travel-app-5743e.firebaseapp.com",
  projectId: "group-travel-app-5743e",
  storageBucket: "group-travel-app-5743e.appspot.com",
  messagingSenderId: "792533972409",
  appId: "1:792533972409:web:296ffb14d2c172903a3268",
  measurementId: "G-T3YG1GHYSG",
};

//New code here...
export const FIREBASE_APP = initializeApp(firebaseConfig);

// export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = getAuth();

//Previous code (revert to this if current method does not work)
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export { auth };
export const db = getFirestore(FIREBASE_APP);

export const storage = getStorage(FIREBASE_APP);

