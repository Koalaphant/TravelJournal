import * as ImagePicker from "expo-image-picker";

const pickImage = async (setImage) => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: null,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to pick an image. Please try again.");
  }
};

export default pickImage;