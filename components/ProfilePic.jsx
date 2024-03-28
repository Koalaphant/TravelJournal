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


const ProfilePic = ({uri, image, onImageSelected, ...props}) => {



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
