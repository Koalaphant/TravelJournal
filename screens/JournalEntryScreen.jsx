import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapSection from "../components/Map";
import Star from "../components/Star";
import UploadMedia from "../components/UploadMedia";

const JournalEntryScreen = () => {
  const navigation = useNavigation();

  const [inputPara, setInputPara] = useState("");
  const [rating, setRating] = useState(0);
  const [locationData, setLocationData] = useState(null); // State to hold location data

  const handleLocationChange = (coordinate) => {
    setLocationData(coordinate); // Update location data state
    console.log("New coordinate: <<< IN THE JOURNAL ENTRY", coordinate); // Log the coordinates
  };

  return (
    <ScrollView style={styles.home} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Start your journey here...</Text>
      <TextInput
        multiline={true}
        style={styles.intro}
        onChangeText={setInputPara}
      />
      <View style={styles.starContainer}>
        <Star rating={rating} setRating={setRating} />
      </View>
      <View style={styles.buttonLayout}>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.buttonText}>Submit</Text>
          <Image
            source={require("../assets/left-arrow.png")}
            style={styles.buttonImg}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => navigation.navigate("Gallery")}
        >
          <Text style={styles.buttonText}>Take photo</Text>
          <Image
            source={require("../assets/gallery.png")}
            style={styles.buttonImg}
          />
        </TouchableOpacity>
      </View>
      <View>
        <UploadMedia />
      </View>
      <View style={styles.mapContainer}>
        {/* Pass the function handleLocationChange as a prop */}
        <MapSection onLocationChange={handleLocationChange} />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#FFEDDF",
  },
  mapContainer: {
    marginBottom: 500,
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
