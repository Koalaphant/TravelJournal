import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/auth";
import { firebaseUi } from "firebaseui"
import firebase from "firebase"

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <Text>Register Screen</Text>
    </View>
  );
};

export default RegisterScreen;

