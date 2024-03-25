import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const HomeMapSection = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
        >
          <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
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
});

export default HomeMapSection;
