import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { UserContext } from "../contexts/UserContext";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../services/config.js";
import { useNavigation } from "@react-navigation/native";

const HomeMapSection = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [entries, setEntries] = useState([]);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 190.9001,
          longitudeDelta: 190.9001,
        });
      }
    })();
  }, []);

  useEffect(() => {
    const fetchCoords = async () => {
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

    fetchCoords();
  }, [user]);

  useEffect(() => {
    const generateMarkers = () => {
      return entries.map((entry, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(entry.coordinates.latitude),
            longitude: parseFloat(entry.coordinates.longitude),
          }}
          title={entry.title}
        >
          {/* Custom marker image */}
          <Image
            source={require("../assets/pin.png")}
            style={{ width: 40, height: 40 }}
          />
          <Callout
            onPress={() =>
              navigation.navigate("IndividualEntry", { id: entry.id })
            }
          >
            <View style={styles.calloutContainer}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <TouchableOpacity style={styles.viewEntryButton}>
                <Text style={styles.viewEntryText}>View Entry</Text>
              </TouchableOpacity>
            </View>
          </Callout>
        </Marker>
      ));
    };

    setMarkers(generateMarkers());
  }, [entries, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <View style={styles.tripViewContainer}>
          <Text style={styles.tripView}>Trip View</Text>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={userLocation} // Use userLocation as initial region
        >
          {markers}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  viewEntryButton: {
    backgroundColor: "#D86779",
    padding: 8,
  },
  viewEntryText: {
    color: "white",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 15,
  },
  mapView: {
    width: "100%",
  },
  tripViewContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  tripView: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D86779",
  },
  calloutContainer: {
    alignItems: "center",
    width: 200,
    paddingVertical: 10,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#D86779",
  },
});

export default HomeMapSection;
