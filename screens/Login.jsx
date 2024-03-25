import { View, Text } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../services/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, isLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
