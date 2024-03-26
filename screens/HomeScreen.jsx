import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import HomeMapSection from "../components/HomeMapSection";
import CountriesList from "../components/CountriesList";

const HomeScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <HomeMapSection />
          <CountriesList />
        </View>
      </View>
    </ScrollView>
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
