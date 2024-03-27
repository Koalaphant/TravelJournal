import * as ImagePicker from "expo-image-picker";

const pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: null,
      quality: 1,
    });

    if (!result.cancelled) {
      return result.assets[0].uri; // Return the URI instead of setting state
    }
    return null; // Return null if no image is picked
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to pick an image. Please try again.");
    return null;
  }
};

export default pickImage;