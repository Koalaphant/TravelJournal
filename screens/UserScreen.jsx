import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
} from "react-native";
import ProfilePic from "../components/ProfilePic";
import {MaterialCommunityIcons} from "@expo/vector-icons"

const UserScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')

const onChangeName = (inputText) => {
  setName(inputText)
}
const onChangeEmail = (inputText) => {
  setEmail(inputText)
}
const onChangeNumber = (inputText) => {
  setNumber(inputText)
}

const handleName = (name) => {
  let regex =  /^[a-zA-Z]{2,}$/g
  if (/[0-9]/.test(name)) {
    Alert.alert('error', 'skd')
  }
}
// const handleEmail = (email) => {
//   let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
//   return regex.text(email)
// }
// const handleNumber = () => {}
  return (
   <View style={styles.container}>
      <Text style={styles.header}>Welcome User</Text>

    <ProfilePic />

    <View style={styles.rows}>

        <View style={styles.row}>
        <MaterialCommunityIcons
          name="account-outline"
          size={24}
          color="#D76778"
        />
        <TextInput style={styles.input} value={name} placeholder='Enter name' onChangeText={onChangeName} onBlur={handleName}></TextInput>
        </View>

        <View style={styles.row}>
        <MaterialCommunityIcons
          name="email-outline"
          size={24}
          color="#D76778"
        />
        <TextInput style={styles.input} value={email} placeholder='Enter email' onChangeText={onChangeEmail}></TextInput>
        </View>

        <View style={styles.row}>
        <MaterialCommunityIcons
          name="phone-outline"
          size={24}
          color="#D76778"
        />
        <TextInput style={styles.input} value={number} placeholder='Enter mobile' onChangeText={onChangeNumber}></TextInput>
        </View>

    </View>  
   </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFEDDF",
  },
  header: {
    marginTop: 12,
    marginBottom: 18,
    fontSize: 29,
    fontWeight: "bold",
    color: '#D76778'
  },
  rows: {
    marginTop: 30,
  },
row: {
  marginTop: 10,
  borderWidth: 2,
  borderColor: '#D76778',
  borderRadius: 20,
  paddingRight: 200,
  padding: 8,
},
input: {
  bottom: 0,
  right: 20,
  left: 0,
  position: 'absolute',
  textAlign: 'right',
}
});
