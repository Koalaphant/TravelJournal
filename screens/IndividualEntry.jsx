import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/config.js";

import { UserContext } from "../contexts/UserContext";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';


const IndividualEntry = () => {
  const [journal, setJournal] = useState({});

  const route = useRoute();
  const { id } = route.params;
  const {user} = useContext(UserContext);


  console.log("Received id:", id); // Log the received id

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        if (!user.uid || !id) return; // Make sure user UID and ID are defined

        // Construct the query to filter entries based on UID and ID
        const docRef = doc(db, "Entries", id); // Assuming id is the document ID
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const journalEntryData = {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          };
          setJournal(journalEntryData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching journal entry:", error);
      }
    };

    fetchJournalEntries();
  }, [id, user.uid]); // Include user.uid and id in the dependency array

  return (
    <View style={styles.wholeScreen}>
      <Text style={styles.header}>{journal.title}</Text>
      <Text style={styles.box}>Location: {journal.country}</Text>
      <Text style={styles.box}>Rating: {journal.rating}/5
      <FontAwesome
          name={'star'}
          color='#D76778'
          size={30}
          style={{ marginHorizontal: 1 }}
        />
      </Text>
      <Text style={styles.box}>{journal.journal_text}</Text>
      <Text>{journal.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wholeScreen: {
    backgroundColor: "#FFEDDF",
    flex:1
  },
  header: {
    backgroundColor: "#D76778",
    textAlign: "center",
    color: "white",
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  box: {
    backgroundColor: "#FFEDDF",
    textAlign: "center",
    color: "#D76778",
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
});

export default IndividualEntry;
