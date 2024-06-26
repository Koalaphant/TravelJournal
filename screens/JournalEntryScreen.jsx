import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapSection from "../components/Map";
import Star from "../components/Star";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/config.js";
import { TouchableOpacity, Pressable, Alert } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { getFirestore } from "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { pickImage } from "../utils/pickImage";
import { takeImage } from "../utils/takeImage";
import { uploadImage } from "../utils/uploadImage";
import countries from "../assets/country-list.js";

const JournalEntryScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [entryTitle, setEntryTitle] = useState("");
  const [country, setCountry] = useState("");
  const [inputPara, setInputPara] = useState("");
  const [rating, setRating] = useState(0);
  const [locationData, setLocationData] = useState(1);
  const [image, setImage] = useState(null);

  const date = new Date();
  const timestamp = date.toString();

  const handleLocationChange = (coordinate) => {
    setLocationData(coordinate); // Update location data state
  };

  // Function to log the rating
  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };
  const handleChoosePhoto = async () => {
    const imageURI = await pickImage();
    const imageURL = await uploadImage(imageURI);
    setImage(imageURL);
    return imageURL;
  };
  const handleTakePhoto = async () => {
    const imageURI = await takeImage();
    const imageURL = await uploadImage(imageURI);
    setImage(imageURL);
    return imageURL;
  };

  // ON SUBMIT

  const handleSubmit = async () => {
    try {
      // Validate country
      const isValidCountry = countries.includes(country);
      if (!isValidCountry) {
        Alert.alert("Invalid Country", "Please enter a valid country.");
        return;
      }

      // Submit data
      if (image) {
        await setDoc(doc(db, "Entries", timestamp), {
          UID: user.uid,
          title: entryTitle,
          country: country,
          rating: rating,
          journal_text: inputPara,
          imageURL: image,
          coordinates: {
            latitude: locationData.latitude || 0,
            longitude: locationData.longitude || 0,
          },
        });
        Alert.alert("Submit successful");
      } else {
        await setDoc(doc(db, "Entries", timestamp), {
          UID: user.uid,
          title: entryTitle,
          country: country,
          rating: rating,
          journal_text: inputPara,
          coordinates: {
            latitude: locationData.latitude || 0,
            longitude: locationData.longitude || 0,
          },
        });
        Alert.alert("Submit successful");
      }
      setEntryTitle("");
      setCountry("");
      setInputPara("");
      setRating(0);
    } catch (error) {
      console.error("Error writing document: ", error);
      Alert.alert("Submit unsuccessful");
    }
  };

  return (
    <ScrollView style={styles.home} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Add a journal entry</Text>
      <TextInput
        style={styles.entrytitle}
        placeholder="Title for your entry"
        onChangeText={setEntryTitle}
      >{entryTitle}</TextInput>
      <TextInput
        style={styles.entrytitle}
        placeholder="Country"
        onChangeText={setCountry}
      >{country}</TextInput>
      <TextInput
        multiline={true}
        style={styles.intro}
        onChangeText={setInputPara}
        placeholder="Today on my travels I...">
      {inputPara}</TextInput>
      <View style={styles.starContainer}>
        {/* Pass handleRatingChange function to the Star component */}
        <Star rating={rating} setRating={handleRatingChange} />
      </View>
      <View style={styles.buttonLayout}>

        <Pressable style={styles.buttons} onPress={handleTakePhoto}>
          <MaterialCommunityIcons name="camera" size={40} color="white" />
        </Pressable>

        <Pressable style={styles.buttons} onPress={handleChoosePhoto}>
          <MaterialCommunityIcons
            name="image-multiple"
            size={40}
            color="white"
          />
        </Pressable>
      </View>

      <View style={styles.mapContainer}>
        {/* Pass the function handleLocationChange as a prop */}
        <MapSection onLocationChange={handleLocationChange} />

        <Pressable style={styles.buttons} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
          <Image
            source={require("../assets/left-arrow.png")}
            style={styles.buttonImg}
          />
        </Pressable>

      </View>
      {/* Display coordinates */}
      {locationData && (
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinatesText}>
            Latitude: {locationData.latitude}
          </Text>
          <Text style={styles.coordinatesText}>
            Longitude: {locationData.longitude}
          </Text>
        </View>
      )}
      <View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#FFEDDF",
  },
  mapContainer: {
    marginBottom: 300
  },
  coordinatesContainer: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    color: "#D76778",
    fontSize: 15,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 12,
    padding: 10,
    textAlign: "left",
    borderColor: "#D76778",
    borderWidth: 2,
    width: "80%",
  },
  coordinatesText: {
    fontSize: 16,
    color: "#D76778",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    backgroundColor: "#FFEDDF",
    color: "#D76778",
    width: "auto",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 40,
    alignSelf: "center",
  },
  intro: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    color: "#D76778",
    fontSize: 15,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 12,
    padding: 10,
    textAlign: "left",
    borderColor: "#D76778",
    borderWidth: 2,
    width: "80%",
    height: "20%",
  },
  entrytitle: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    color: "#D76778",
    fontSize: 15,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 12,
    padding: 10,
    textAlign: "left",
    borderColor: "#D76778",
    borderWidth: 2,
    width: "70%",
    height: 40,
  },
  buttonLayout: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  buttons: {
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: "#D76778",
    paddingLeft: 8,
    borderRadius: 4,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginTop: 10
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  buttonImg: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});

export default JournalEntryScreen;
