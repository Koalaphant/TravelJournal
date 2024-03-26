import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator, KeyboardAvoidingView} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../services/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {collection, addDoc } from "firebase/firestore";
import {db} from '../services/config.js'
const auth = FIREBASE_AUTH;



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;
  const user = FIREBASE_AUTH.currentUser
  console.log(user, "THIS")
  const signIn = async () => {
    setLoading(true)
  
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response, " <<LOG IN")
      await addDoc(collection(db, "users", user), {
        username: username,
        email: email
      }).then(() =>{
        console.log('data submitted')
      }).catch((error) =>{
        console.log(error)
      })
     
    }catch(error){
      console.log(error)
    } finally{
      setLoading(false)
    }
  }
  
  const signUp = async () => {
    setLoading(true)
  
    try{
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response, " <<SIGN UP")
      
      alert('Check your email')
    }catch(error){
      console.log(error)
      alert('Sign up failed')
    } finally{
      setLoading(false)
    }
  }
  
  return (
    <View style = {styles.container}>
      <KeyboardAvoidingView behaviour='padding'>
      <TextInput value={username} onChangeText={setUsername} placeholder="Name" style={styles.input}/>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input}/>
      <TextInput value={password} secureTextEntry={true} onChangeText={setPassword} placeholder="Password" style={styles.input}/>
      { loading ? <ActivityIndicator size="large" color='#0000ff'/>
      : (
      <>
      <Button title="Login" onPress={signIn}/>
      <Button title="Sign Up" onPress={signUp}/>
      </>
      )}
      </KeyboardAvoidingView>
    </View>
  );
};



export default Login;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 80,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  }
})