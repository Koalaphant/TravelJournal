import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../services/config.js";
import { UserContext } from "../App.js";

const CountriesList = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  const user = useContext(UserContext); // Access user context

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        if (!user) return; // If user context is not available, return

        const entriesRef = collection(db, "Entries");
        const q = query(entriesRef, where("UID", "==", user.uid)); // Filter entries by user's UID
        const querySnapshot = await getDocs(q);

        const entriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEntries(entriesData);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, [user]);

  if (!fontsLoaded || entries.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {entries.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.text}>{item.country}</Text>
        </View>
      ))}
    </View>
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
    height: 50,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    color: "#000",
  },
});

export default CountriesList;
