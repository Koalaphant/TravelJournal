import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"
import placeholder from '../assets/user.png'
import pickImage from "../utils/pickimage";
const ProfilePic = ({uri, onPress, onButtonPress, ...props}) => {
  const [image, setImage] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)


  const uploadImage = async () => {
    try {
        await ImagePicker.requestCameraPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        })

    if (!result.canceled) {
        await saveImage(result.assets[0].uri)
    }
    } catch(error) {
        alert("Error uploading image", error)
    }
  };

  const saveImage = async (image) => {
    try {
        setImage(image)
        alert('Profile picture uploaded!')
        setIsModalVisible(false)
    } catch (error) {
        throw(error)
    }
  }

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }
  
  return (
    <View>
      <Image
        style={styles.profilePic}
        source={image ? { uri: image } : placeholder}
      />

    <Modal visible={isModalVisible} transparent animationType="slide">
    <TouchableWithoutFeedback onPress={closeModal}>
    <View style={styles.modal_container}>
    <TouchableWithoutFeedback>
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
    </TouchableWithoutFeedback>
    </View>
    </TouchableWithoutFeedback>
    </Modal>



      <TouchableOpacity style={styles.button} onPress={openModal}>
        <MaterialCommunityIcons
          name="camera-plus-outline"
          size={24}
          color="black"
        />

      </TouchableOpacity>
    </View>
    
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFEDDF",
  },
  profilePic: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 100,
    borderColor: "#D76778",
    borderWidth: 3,
  },
  button: {
    position: "absolute",
    borderRadius: 24,
    borderWidth: 2,
    borderBlockColor: 'black',
    right: 10,
    bottom: 10,
    backgroundColor: '#FFEDDF',
    padding: 4
  },
  modal_container: {
    alignItems: 'center',
    left: 25,
  },
  modal: {
    width: 50,
    height: 100,
    backgroundColor: '#FFEDDF',
    borderBlockColor: 'pink',
    borderRadius: 24,
    borderWidth: 0,
    padding: 0,
    // flexDirection: '',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 200,
    marginTop: 240,
  }
});
