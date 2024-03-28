// MapSection.jsx

import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapSection = ({ onLocationChange }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState(null);

  const getLocationData = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      const newMarker = {
        id: 1,
        coordinate: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      };
      setMarker(newMarker);
      // Pass the location data to the parent component
      onLocationChange(newMarker.coordinate);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const handleMapLongPress = (event) => {
    if (!marker) {
      const newMarker = {
        id: 1,
        coordinate: event.nativeEvent.coordinate,
      };
      setMarker(newMarker);
      // Pass the location data to the parent component
      onLocationChange(newMarker.coordinate);
    }
  };

  const handleMarkerDragEnd = (event) => {
    const newCoordinate = event.nativeEvent.coordinate;
    setMarker({ ...marker, coordinate: newCoordinate });
    // Pass the location data to the parent component
    onLocationChange(newCoordinate);
  };

  const removeMarker = () => {
    setMarker(null);
    // Pass null to indicate removal of marker
    onLocationChange(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onLongPress={handleMapLongPress}
      >
        {marker && (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </MapView>
      <View style={styles.buttonLayout}>
        <Button title="Get Current Location" onPress={getLocationData} />
        <Button
          title="Remove Marker"
          onPress={removeMarker}
          disabled={!marker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  map: {
    width: "100%",
    height: 300,
  },
  buttonLayout: {
    backgroundColor: "pink",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default MapSection;
