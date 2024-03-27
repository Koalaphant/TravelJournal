import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/config.js";
import { useNavigation } from "@react-navigation/native";

const JournalEntriesScreen = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const journalEntriesRef = collection(db, "Traveller2", "England", "Trip1");
        const querySnapshot = await getDocs(journalEntriesRef);

        // Iterate over documents in the subcollection
        const journalEntriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Log the fetched journal entries
        console.log("Fetched Journal Entries:", journalEntriesData);

        // Set state with the list of journal entries
        setJournalEntries(journalEntriesData);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, []); // Make sure to pass an empty dependency array to useEffect to fetch data only once

  return (
    <View style={styles.wholeScreen}>
      <Text style={styles.header}>Journal entries</Text>
      <ScrollView style={styles.container}>
        {journalEntries.map((entry) => (
          <View key={entry.id} style={[styles.box1, styles.box]}>
            <TouchableOpacity onPress={() => navigation.navigate("IndividualEntry")}>
                <Text>{entry.title}</Text>
                </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
  },
  header: {
    backgroundColor: "grey",
    textAlign: "center",
    color: "white",
    height: "10%",
  },
  container: {
    backgroundColor: "#ddd",
    flexGrow: 1,
  },
  box: {
    height: 40,
    margin: 50,
  },
  box1: {
    backgroundColor: "violet",
  },
});

export default JournalEntriesScreen;
