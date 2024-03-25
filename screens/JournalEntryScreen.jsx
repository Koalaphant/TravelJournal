import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

const JournalEntryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Journal Entry Screen</Text>
      <Button title="Click Here" onPress={() => alert("Button Clicked!")} />
    </View>
  );
};

export default JournalEntryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
