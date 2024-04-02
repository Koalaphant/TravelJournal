import * as ImagePicker from "expo-image-picker";
import Alert from "react-native";
import uploadImage from "./uploadImage";

const takeimage = async () => {
  const saveImage = async (image) => {
    try {
      uploadImage(image);
      alert("Image uploaded");
    } catch (error) {
      Alert.alert("error", error);
    }
  };
  try {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      await saveImage(result.assets[0].uri);
      return result.assets[0].uri
    }
    if(result.canceled){
      return null
    }
  } catch (error) {
    alert("Error uploading image", error);
    console.log(error);
  }
};

export default takeimage;
