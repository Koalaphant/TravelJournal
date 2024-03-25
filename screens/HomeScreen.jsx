import React from "react";
import { StyleSheet, View } from "react-native";
import HomeMapSection from "../components/HomeMapSection";
import CountriesList from "../components/CountriesList";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <HomeMapSection />
        <CountriesList />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFEDDF",
  },
  contentContainer: {
    marginHorizontal: 20,
  },
});
