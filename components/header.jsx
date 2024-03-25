import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <Text>PocketJournal</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 0,
  },
});

export default Header;
