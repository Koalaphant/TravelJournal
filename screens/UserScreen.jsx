import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

const UserScreen = () => {
  return (
    <View style={styles.container}>
      <Text>User Screen</Text>
      <Button title="Click Here" onPress={() => alert("Button Clicked!")} />
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
