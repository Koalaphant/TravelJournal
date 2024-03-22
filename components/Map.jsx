import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // Import the Location module from expo-location

const MapSection = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState(null); // State to manage the single marker

  const getLocationData = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync(); // Request permission to access location
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({}); // Get the current location
      setRegion({ // Update the region with the user's current location
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01, // Adjusted for very zoomed in view
        longitudeDelta: 0.01, // Adjusted for very zoomed in view
      });
      setMarker({ // Set marker at the user's current location
        id: 1, // Set a fixed ID for the marker
        coordinate: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleMapLongPress = (event) => {
    if (!marker) {
      const newMarker = {
        id: 1, // Set a fixed ID for the marker
        coordinate: event.nativeEvent.coordinate,
      };
      setMarker(newMarker); // Set marker state to the new marker
    }
  };

  const handleMarkerDragEnd = (event) => {
    const newCoordinate = event.nativeEvent.coordinate;
    setMarker({ ...marker, coordinate: newCoordinate }); // Update marker coordinates when marker is dragged
  };

  const removeMarker = () => {
    setMarker(null); // Remove the marker
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region} // Set the region of the map to the state variable
        onLongPress={handleMapLongPress} // Handle long press events on the map
      >
        {marker && (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            draggable
            onDragEnd={handleMarkerDragEnd} // Handle marker drag events
          />
        )}
      </MapView>
      <View style={styles.buttonLayout}>
        <Button title='Get Current Location' onPress={getLocationData} />
        <Button title='Remove Marker' onPress={removeMarker} disabled={!marker} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
    marginBottom: 90,
    marginLeft: 20,
    marginRight: 20
  },
  map: {
    width: '100%',
    height: 300,
  },
  buttonLayout: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10
  }
});

export default MapSection;
