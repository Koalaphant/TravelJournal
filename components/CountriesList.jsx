import React from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

const CountriesList = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  const testData = [
    {
      cityName: "Paris",
      coverPhoto:
        "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      cityName: "Berlin",
      coverPhoto:
        "https://images.pexels.com/photos/109630/pexels-photo-109630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      cityName: "Milan",
      coverPhoto:
        "https://images.pexels.com/photos/37079/milan-pegasus-gallery-statue.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      cityName: "London",
      coverPhoto:
        "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {testData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <ImageBackground
              source={{ uri: item.coverPhoto }}
              style={styles.imageBackground}
            >
              <View style={styles.overlay} />
              <Text style={styles.text}>{item.cityName}</Text>
            </ImageBackground>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 200,
  },
  itemContainer: {
    alignItems: "center",
    marginTop: 30,
    overflow: "hidden",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    height: 200,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the opacity as needed
    borderRadius: 10,
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 40,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 10, // Shadow blur radius
  },
});

export default CountriesList;
