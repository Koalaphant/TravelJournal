import * as ImagePicker from "expo-image-picker";
import alert from "react-native";




export const takeImage = async () => {

  try {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0].uri
      return image
    }
    if(result.canceled){
      return null
    }
  } catch (error) {
    alert("Error uploading image", error);
    console.log(error);
  }
};


