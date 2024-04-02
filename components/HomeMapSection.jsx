import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Image, Text, LogBox } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { UserContext } from "../App.js";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../services/config.js";

const HomeMapSection = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [entries, setEntries] = useState([]);
  const user = useContext(UserContext);

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
          latitudeDelta: 50.9001,
          longitudeDelta: 50.9001,
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

  const userCoordinates = [...new Set(entries.map((entry) => entry.coordinates))];
  useEffect(() => {
   
    // Example: Add some markers to the map
    // const someCoordinates = [
    //   { latitude: 51.5074, longitude: -0.1278, title: "London" },
    //   { latitude: 40.7128, longitude: -74.006, title: "New York" },
    //   { latitude: -33.8688, longitude: 151.2093, title: "Sydney" },
    //   { latitude: 35.6895, longitude: 139.6917, title: "Tokyo" },
    //   { latitude: -22.9068, longitude: -43.1729, title: "Rio de Janeiro" },
    //   { latitude: 48.8566, longitude: 2.3522, title: "Paris" },
    //   { latitude: -1.2864, longitude: 36.8172, title: "Nairobi" },
    //   { latitude: 19.4326, longitude: -99.1332, title: "Mexico City" },
    //   { latitude: 55.7558, longitude: 37.6176, title: "Moscow" },
    //   { latitude: -22.9519, longitude: -43.2105, title: "Belo Horizonte" },
    //   { latitude: 41.9028, longitude: 12.4964, title: "Rome" },
    //   { latitude: 52.52, longitude: 13.405, title: "Berlin" },
    //   { latitude: 40.4168, longitude: -3.7038, title: "Madrid" },
    //   { latitude: 48.2082, longitude: 16.3738, title: "Vienna" },
    //   { latitude: 41.3851, longitude: 2.1734, title: "Barcelona" },
    //   { latitude: 50.0755, longitude: 14.4378, title: "Prague" },
    //   { latitude: 52.3667, longitude: 4.8945, title: "Amsterdam" },
    //   { latitude: 59.3293, longitude: 18.0686, title: "Stockholm" },
    //   { latitude: 52.2297, longitude: 21.0122, title: "Warsaw" },
    // ];

    setMarkers(
      userCoordinates.map((coord, index) => (
        <Marker
          key={`${parseFloat(coord.latitude)}-${parseFloat(coord.longitude)}`}
          coordinate={{ latitude: parseFloat(coord.latitude), longitude: parseFloat(coord.longitude) }}
          title={coord.title}
          description={coord.title}
        >
          {/* Custom marker image */}
          <Image
            source={require("../assets/pin.png")}
            style={{ width: 40, height: 40 }}
          />
        </Marker>
      ))
    );
  }, []);

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
    fontWeight: 'bold',
    color: "#D86779",
  },
});

export default HomeMapSection;
