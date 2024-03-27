import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button
} from "react-native";
import ProfilePic from "../components/ProfilePic";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { FIREBASE_AUTH } from "../services/config";
import { updateUserProfile } from "../services/updateUserProfile";
import pickImage from "../utils/pickimage";
import uploadImage from "../utils/uploadimage";

const UserScreen = () => {
  const [displayName, setDisplayName] = useState(null)
  const [number, setNumber] = useState(null)
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

const onChangeName = (inputText) => {
  setDisplayName(inputText)
}

const onChangeNumber = (inputText) => {
  setNumber(inputText)
}
const handleImageSelected = async (imageUri) => {
  const imageUri = await pickImage();
  if (imageUri) {
    setImage(imageUri); 
    const uploadedImageUrl = await uploadImage(imageUri);
    
  }
};

const handleSubmit = async () => {
  if(image && displayName && number){
    setUploading(true)
    const imageUrl = await uploadImage(image)
    await updateUserProfile(displayName, number, imageUrl)
  }
  else if(!image || !displayName || !number){
    Alert.alert("Error", "Please fill all the fields")
  }
}


  return (
   <View style={styles.container}>
      <Text style={styles.header}>Welcome User</Text>

    <ProfilePic image={image} onImageSelected={handleImageSelected}/>

    <View style={styles.rows}>

        <View style={styles.row}>
        <MaterialCommunityIcons
          name="account-outline"
          size={24}
          color="#D76778"
        />
        <TextInput style={styles.input} value={displayName} placeholder='Enter name' onChangeText={onChangeName}></TextInput>
        </View>


        <View style={styles.row}>
        <MaterialCommunityIcons
          name="phone-outline"
          size={24}
          color="#D76778"
        />
        <TextInput style={styles.input} value={number} placeholder='Enter mobile' onChangeText={onChangeNumber}></TextInput>
        </View>
      
        <Button style={styles.button} title="Submit" color="#D76778" onPress={handleSubmit}>
        </Button>

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
button: {
  position: 'relative',
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
