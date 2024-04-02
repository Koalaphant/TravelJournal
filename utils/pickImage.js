import * as ImagePicker from "expo-image-picker";
import alert  from "react-native";



export const pickImage = async () => {

  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: null,
      quality: 1,
    });

    if (!result.cancelled) {
      const image = result.assets[0].uri; 
      return image
    }
    if(result.cancelled){
      return null
    }
  } catch (error) {
    console.error(error);
    alert("Error", "Failed to pick an image. Please try again.");
    return null;
  }
};


