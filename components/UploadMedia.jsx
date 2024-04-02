import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import pickImage from "../utils/pickimage";
import uploadImage from "../utils/uploadImage";

const UploadMedia = () => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleImagePick = async () => {
    const pickedImage = await pickImage();
    if (pickedImage) {
      setImage(pickedImage);
    }
  };
  const handleImageUpload = async () => {
    const imageUrl = await uploadImage(image, setUploading, setImage);
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smallButton} onPress={handleImagePick}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
        {image && (
          <TouchableOpacity style={styles.smallButton} onPress={handleImageUpload}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
        )}
      </View>
      {image && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.previewImage} />
        </View>
      )}
    </View>
  );
};

export default UploadMedia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  smallButton: {
    backgroundColor: "#D76778",
    padding: 10,
    marginVertical: 10,
    width: 120, 
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  previewContainer: {
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: 200, 
    height: 200, 
  },
});
