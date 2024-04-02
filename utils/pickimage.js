import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { uploadImage } from "./uploadImage";

const pickImage = async () => {
  const saveImage = async (image) => {
    try {
        uploadImage(image)
        alert("Image uploaded")
    } catch (error) {
    Alert.alert('error', error)
}
}
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: null,
      quality: 1,
    });

    if (!result.cancelled) {
      saveImage(result.assets[0].uri)
      return result.assets[0].uri; 
    }
    if(result.cancelled){
      return null
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to pick an image. Please try again.");
    return null;
  }
};

export default pickImage;