import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export const signUp = (email, password) => {
    const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      return user;
    }
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { errorCode, errorMessage };
  });
};
