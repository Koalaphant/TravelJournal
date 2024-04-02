import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, Pressable } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../services/config.js";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

const CountriesList = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  const {user} = useContext(UserContext);
  const navigation = useNavigation();

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        if (!user) return;

        const entriesRef = collection(db, "Entries");
        const q = query(entriesRef, where("UID", "==", user.uid));
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

  // Filter unique countries
  const uniqueCountries = [...new Set(entries.map((entry) => entry.country))];

  return (
    <View style={styles.container}>
      {uniqueCountries.map((country, index) => {
        const entry = entries.find((entry) => entry.country === country);
        return (
          <Pressable
            key={index}
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate("JournalEntriesScreen", {
                country: entry.country,
              })
            }
          >
            <Text style={styles.text}>{entry.country}</Text>
            <Text style={styles.viewButton}>View Entries</Text>
          </Pressable>
        );
      })}
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
    height: 100,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    color: "#000",
  },
  viewButton: {
    backgroundColor: '#D76778',
    fontSize: 16,
    padding: 5,
    borderRadius: 5,
    color: '#f1f1f1',
    fontWeight: 'bold'
  }
});

export default CountriesList;
