import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
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
  const [imageUrl, setImageUrl] = useState(null)
  const [uploading, setUploading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const user = FIREBASE_AUTH.currentUser;
  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

const onChangeName = (inputText) => {
  setDisplayName(inputText)
}

const onChangeNumber = (inputText) => {
  setNumber(inputText)
}
const handleImageSelected = async () => {
  try {
    const imageUri = await pickImage();
    if (!imageUri) {
      Alert.alert("Error", "No image was selected.");
      return; // Exit the function if no image was selected
    }
    setImage(imageUri);
    setUploading(true);
    const imageUrl = await uploadImage(imageUri);
    setImageUrl(imageUrl);
    setUploading(false);
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    Alert.alert("Error", e.message || "An unexpected error occurred. Please try again.");
  } finally {
    setUploading(false); // Ensure uploading is set to false in case of error or success
  }
};

const handleSubmit = async () => {
  if(imageUrl && displayName && number){
    setUploading(true)
    
    await updateUserProfile(displayName, number, imageUrl)
  }
  else if(!image || !displayName || !number){
    Alert.alert("Error", "Please fill all the fields")
  }
}


  return (
   <View style={styles.container}>
      <Text style={styles.header}>Welcome {user.displayName ? user.displayName : user.email}</Text>

    <ProfilePic image={image} onImageSelected={handleImageSelected}/>
<TouchableWithoutFeedback onPress={closeModal}>
    <TouchableOpacity style={styles.button} onPress={() => { isModalVisible ? closeModal() : openModal()}}>
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
          onPress={uploadImage}
        />
       <MaterialCommunityIcons
          name="camera-burst"
          size={28}
          color="black"
          onPress={pickImage}
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
        name="phone-outline"
        size={24}
        color="#D76778"
      />
      <TextInput style={styles.input} value={number} placeholder='Enter mobile' onChangeText={onChangeNumber}></TextInput>
     </View>
      
      <Button style={styles.button} title="Submit" color="#D76778" onPress={handleSubmit}></Button>

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
    marginTop: 0,
    marginBottom: 10,
    fontSize: 29,
    fontWeight: "bold",
    color: '#D76778'
  },
  bottomContainer: {
    marginTop: 5,
  },
textFields: {
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
},
button: {
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
modal_container: {
  alignItems: 'center',
  left: 25,
  top: 75
},
modal: {
  width: 50,
  height: 100,
  backgroundColor: '#FFEDDF',
  borderBlockColor: 'pink',
  borderRadius: 24,
  borderWidth: 0,
  padding: 0,
  justifyContent: 'space-around',
  alignItems: 'center',
  marginLeft: 200,
  marginTop: 240,
}
});
