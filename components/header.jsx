import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../assets/traveLogo.png")}
          style={{ width: 400, height: 150, resizeMode: "contain" }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingTop: 0,
    alignItems: "center",
    backgroundColor: "#FFEDDF",
  },
});

export default Header;
