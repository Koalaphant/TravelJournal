import { signInWithEmailAndPassword, createUserWithEmailAndPassword, } from "firebase/auth";
import { FIREBASE_AUTH } from "./config";

export const signIn = async (email, password) => {
    const auth = FIREBASE_AUTH
    
  
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response.user
    }catch(error){
      console.log(error)
    } 
  }
  export const signUp = async (email, password) => {
    const auth = FIREBASE_AUTH
   
  
    try{
      const response = await createUserWithEmailAndPassword(auth, email, password);
      return response.user
    }catch(error){
      console.log(error)
      alert('Sign up failed')
    } 
  }
  export const signOut = async () => {
    await auth.signOut()
  }

