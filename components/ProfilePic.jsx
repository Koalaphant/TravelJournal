import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"
import placeholder from '../assets/user.png'

const ProfilePic = ({uri, image, onImageSelected, ...props}) => {



  // const uploadImage = async () => {
  //   try {
  //       await ImagePicker.requestCameraPermissionsAsync();
  //       let result = await ImagePicker.launchCameraAsync({
  //           cameraType: ImagePicker.CameraType.front,
  //           allowsEditing: true,
  //           aspect: [1,1],
  //           quality: 1,
  //       })

  //   if (!result.canceled) {
  //       await saveImage(result.assets[0].uri)
  //   }
  //   } catch(error) {
  //       alert("Error uploading image", error)
  //   }
  // };

  // const saveImage = async (image) => {
  //   try {
  //       setImage(image);
  //       alert('Profile picture uploaded!');
  //       onImageSelected(image); // Pass the selected image URI back to the parent component
  //   } catch (error) {
  //       throw(error);
  //   }
  // }

  return (
    <View>
      <Image
        style={styles.profilePic}
        title="profilePicture"
        source={image ? { uri: image } : placeholder}
      />

      <TouchableOpacity style={styles.button} onPress={onImageSelected}>
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

});
