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
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../services/config";
import * as FileSystem from "expo-file-system";

const UploadMedia = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: null, // Remove or set aspect to null to prevent cropping
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
      // Handle the error here, e.g., show an alert to the user
      Alert.alert("Error", "Failed to pick an image. Please try again.");
    }
  };

  //upload media files
  const uploadMedia = async () => {
    setUploading(true);

    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);
      setUploading(false);
      Alert.alert("Photo uploaded!");
      setImage(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
        {image && (
          <TouchableOpacity style={styles.button} onPress={uploadMedia}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
        )}
      </View>
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
  button: {
    backgroundColor: "#D76778",
    padding: 10,
    marginVertical: 10,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
