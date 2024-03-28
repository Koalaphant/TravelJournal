import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import placeholder from '../assets/user.png'
import pickImage from "../utils/pickimage";

const ProfilePic = ({uri, onPress, onButtonPress, ...props}) => {
  const [image, setImage] = useState(null)

  return (
    <View>
      <Image
        style={styles.profilePic}
        source={image ? { uri: image } : placeholder}
      />
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

});
