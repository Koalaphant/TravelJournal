import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../services/config.js";
import { useFonts, Poppins_300Light } from "@expo-google-fonts/poppins";
import { UserContext } from "../contexts/UserContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const IndividualEntry = () => {
  const [journal, setJournal] = useState({});
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const { user } = useContext(UserContext);
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
  });

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

  const handleDelete = async () => {
    try {
      if (!user.uid || !id) return; // Make sure user UID and ID are defined

      // Construct the reference to the document to delete
      const docRef = doc(db, "Entries", id); // Assuming id is the document ID
      await deleteDoc(docRef);

      // Navigate back to the previous screen after deletion
      navigation.navigate("Home", { reload: true });
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      Alert.alert("Error", "Failed to delete journal entry.");
    }
  };

  if (!fontsLoaded) {
    return null; // Return null while the font is loading
  }

  // Function to render rating stars
  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < journal.rating; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={"star"}
          color="white"
          size={20}
          style={{ marginHorizontal: 3 }}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.wholeScreen}>
      {journal.imageURL ? (
        <ImageBackground
          source={{ uri: journal.imageURL }}
          style={styles.headerContainer}
        >
          <View style={styles.overlay} />
          <Text style={styles.title}>{journal.title}</Text>
          <Text style={styles.subtitlelocation}>{journal.country}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>{renderRatingStars()}</View>
          </View>
        </ImageBackground>
      ) : (
        <View style={[styles.headerContainer, { backgroundColor: "#D86779" }]}>
          <Text style={styles.title}>{journal.title}</Text>
          <Text style={styles.subtitlelocation}>{journal.country}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>{renderRatingStars()}</View>
          </View>
        </View>
      )}

      <ScrollView>
        <Text style={styles.textBox}>{journal.journal_text}</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: journal.imageURL }} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wholeScreen: {
    backgroundColor: "#FFEDDF",
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 30,
    resizeMode: "cover", // Ensure the image covers the container
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)", // Dark overlay color with 50% opacity
  },
  title: {
    color: "white",
    fontSize: 30,
    marginBottom: 10,
  },
  subtitlelocation: {
    color: "white",
    fontSize: 25,
    backgroundColor: "white",
    color: "#D86779",
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  textBox: {
    marginTop: 30,
    marginHorizontal: 20,
    lineHeight: 34,
    fontSize: 20,
    fontFamily: "Poppins_300Light",
    marginBottom: 50,
  },
  ratingContainer: {
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    aspectRatio: 1 / 1,
    width: "80%",
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  deleteButton: {
    backgroundColor: "#D86779",
    padding: 15,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default IndividualEntry;
