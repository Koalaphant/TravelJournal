import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/config.js";

const JournalEntriesScreen = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const journalEntriesRef = collection(db, "journalentry");
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
            <Text>{entry.title}</Text>
            <Text>{entry.location}</Text>
            <Text>{entry.rating}</Text>
            <Text>{entry.journalentry}</Text>
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
    height: 30,
    margin: 50,
  },
  box1: {
    backgroundColor: "violet",
  },
});

export default JournalEntriesScreen;
