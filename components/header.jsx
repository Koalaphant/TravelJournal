import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../assets/Travelog.png")}
          style={{ width: 250, height: 50, resizeMode: "contain" }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: "#FFEDDF",
  },
});

export default Header;
