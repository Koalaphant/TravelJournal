import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../services/config.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";

const JournalEntriesScreen = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { country } = route.params;
  const {user} = useContext(UserContext);

  console.log(country, "<<<");

  // Use the country parameter in your fetch logic or wherever it's needed

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        if (!country) return; // Make sure country is defined

        // Construct the query to filter entries based on UID and country
        const entriesRef = collection(db, "Entries");
        const q = query(
          entriesRef,
          where("UID", "==", user.uid),
          where("country", "==", country)
        );

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Map the fetched documents to data objects
        const journalEntriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set the state with the filtered journal entries
        setJournalEntries(journalEntriesData);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, [country, user]);

  return (
    <View style={styles.wholeScreen}>
      <ScrollView>
        {journalEntries.map((entry) => (
          <View key={entry.id} style={styles.box}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("IndividualEntry", { id: entry.id })
              }
            >
              <Text style={styles.entries}>{entry.title}</Text>
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
    backgroundColor: '#FFEDDF'
  },
  box: {
    backgroundColor: "#D76778",
    borderRadius: 8,
    margin: 20
  },
  entries: {
    fontSize: 25,
    color: '#fff',
    padding:10,
    textAlign: 'center'
  }
});

export default JournalEntriesScreen;
