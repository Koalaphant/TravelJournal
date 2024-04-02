import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator, KeyboardAvoidingView} from "react-native";
import React, { useState, useContext } from "react";
import { FIREBASE_AUTH } from "../services/config";

import { UserContext } from "../contexts/UserContext"
import { signIn, signUp, signOut } from "../services/signinandout"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(UserContext)
 
  const handleSignIn = async () => {
    const user = await signIn(email, password)
    setUser(user)
  }
  const handleSignUp = async () => {
    const user = await signUp(email, password)
    setUser(user)
  }

  
  
  return (
    <View style = {styles.container}>
      <KeyboardAvoidingView behaviour='padding'>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input}/>
      <TextInput value={password} secureTextEntry={true} onChangeText={setPassword} placeholder="Password" style={styles.input}/>
      { loading ? <ActivityIndicator size="large" color='#0000ff'/>
      : (
      <>
      <Button title="Login" onPress={handleSignIn}/>
      <Button title="Sign Up" onPress={handleSignUp}/>
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