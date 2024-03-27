import { firebase, storage } from "../services/config";
import * as FileSystem from "expo-file-system";
import { ref, uploadBytes } from "firebase/storage";
import { Alert } from "react-native";

const uploadImage = async (image, setUploading, setImage) => {
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
    const storageRef = ref(storage, filename);

    await uploadBytes(storageRef, blob);
    setUploading(false);
    Alert.alert("Photo uploaded!");
    setImage(null);
  } catch (error) {
    console.error(error);
    setUploading(false);
  }
};

export default uploadImage;