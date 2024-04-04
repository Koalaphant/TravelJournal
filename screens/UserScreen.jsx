import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import ProfilePic from "../components/ProfilePic";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { FIREBASE_AUTH, db } from "../services/config";
import { getAuth, doc, setDoc, getDoc } from "firebase/auth";
import { updateUserProfile, updateUserPhoto } from "../services/updateUserProfile";
import { UserContext } from "../contexts/UserContext"
import { pickImage} from "../utils/pickImage"
import { takeImage} from "../utils/takeImage"
import { uploadImage} from "../utils/uploadImage"

const UserScreen = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const {user, setUser} = useContext(UserContext)
  const auth = getAuth()

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

const onChangeName = (inputText) => {
  setDisplayName(inputText)
}

const onChangeEmail = (inputText) => {
  setEmail(inputText)
}

const handleTakeImage = async () => {
  const takenImage = await takeImage()
  if(!takenImage){
    return
  }
  setImage(takenImage)
  const imageURL = await uploadImage(takenImage)
  await updateUserPhoto(imageURL)
  setImageURL(imageURL)
}
const handlePickImage = async () => {
  const pickedImage = await pickImage()
  if(!pickedImage){
    return
  }
  setImage(pickedImage)
  const imageURL = await uploadImage(pickedImage)
  await updateUserPhoto(imageURL)
  setImageURL(imageURL)
}

  

const handleSubmit = async () => {
  if(displayName && email){
  
      await updateUserProfile(displayName, email).catch(()=>Alert.alert('Something went wrong'))
      Alert.alert('Profile updated') 
     
    }
  if(displayName && imageURL){await updateUserProfile(displayName, number).catch(()=>Alert.alert('Something went wrong'))
    
  await updateUserProfile(displayName, email)
  await updateUserPhoto(imageURL)
  await setDoc(doc(db, "Users", user.uid), {
      displayName: displayName,
      imageURL: imageURL,
      friends : {}
    })
  }
  else if(!displayName || !email){
    Alert.alert("Error", "Please fill all the fields")
  }
}
const handleSignOut = () => {
  setUser(null)
  auth.signOut()
}
  useEffect(() => {
    const currentUser = auth.currentUser
    if(currentUser){
      setImageURL(currentUser.photoURL)
    }
    
  }, [])



  return (
    <ScrollView style={styles.wholescreen}>
   <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <Text style={styles.username}>{user.displayName ? user.displayName : user.email}</Text>
      
    <TouchableOpacity style={styles.exitButton} onPress={handleSignOut}>
      <MaterialCommunityIcons
        name="logout"
        size={22}
        color="black"
      />
    </TouchableOpacity>

<View style={styles.image}>
    <ProfilePic image={imageURL} />
    </View>

<TouchableWithoutFeedback onPress={closeModal}>
    <TouchableOpacity style={styles.modalButton} onPress={() => { isModalVisible ? closeModal() : openModal()}}>
        <MaterialCommunityIcons
          name="camera-plus-outline"
          size={24}
          color="black"
        />
    </TouchableOpacity>
</TouchableWithoutFeedback>

    <Modal visible={isModalVisible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={closeModal}>
    <View style={styles.modal_container}>
    <View style={styles.modal}>
      <MaterialCommunityIcons
          name="camera-outline"
          size={28}
          color="black"
          onPress={handleTakeImage}
        />
       <MaterialCommunityIcons
          name="camera-burst"
          size={28}
          color="black"
          onPress={handlePickImage}
        />
    </View>

    </View>
      </TouchableWithoutFeedback>
    </Modal>


    <View style={styles.bottomContainer}>
     <View style={styles.textFields}>
      <MaterialCommunityIcons
        name="account-outline"
        size={24}
        color="#D76778"
      />
      <TextInput style={styles.input} value={displayName} placeholder='Enter name' onChangeText={onChangeName}></TextInput>
     </View>

     <View style={styles.textFields}>
      <MaterialCommunityIcons
        name="email-outline"
        size={24}
        color="#D76778"
      />
      <TextInput style={styles.input} value={email} placeholder='Enter email' onChangeText={onChangeEmail}></TextInput>
     </View>
      
      
    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
      <Text style={{ color: 'white', fontSize: 16, textAlign: 'center'}}>Submit</Text>
    </TouchableOpacity>
    </View>
   </View>
    </ScrollView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFEDDF",
},
  scroll: {
    flexGrow:1,
},
  header: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 35,
    fontWeight: "bold",
    color: '#D76778'
},
  username: {
    marginTop: 0,
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "bold",
    color: '#181818'
},
  bottomContainer: {
    marginTop: -30
},
  textFields: {
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
},
  modalButton: {
  position: "relative",
  borderRadius: 24,
  borderWidth: 2,
  borderBlockColor: 'black',
  left: 70,
  bottom: 42,
  alignItems: 'center',
  backgroundColor: '#FFEDDF',
  padding: 4
},
exitButton: {
  position: "relative",
  borderRadius: 24,
  borderWidth: 2,
  borderBlockColor: 'black',
  left: 130,
  top: -35,
  alignItems: 'center',
  backgroundColor: '#FFEDDF',
  padding: 3
},
  submitButton: {
  backgroundColor: '#D76778',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  marginTop: 5
},
  modal_container: {
  alignItems: 'center',
  left: 25,
  top: 75
},
  modal: {
  width: 50,
  height: 100,
  backgroundColor: '#FFEDDF',
  borderBlockColor: 'black',
  borderRadius: 24,
  borderWidth: 2,
  padding: 0,
  justifyContent: 'space-around',
  alignItems: 'center',
  marginLeft: 200,
  marginTop: 240,
},
image: {
  marginTop: -22
},
wholescreen: {
  backgroundColor: '#FFEDDF'
}
});
