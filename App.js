import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import { useUser } from "./contexts/UserContext";
import { UserProvider, UserContext } from "./contexts/UserContext";
import RootStack from "./navigation/RootStack";





const App = () => {
const {user, setUser} = useContext(UserContext)

  return (
    <UserProvider value={{user, setUser}}>
    <RootStack />
     </UserProvider>
  );
};

export default App;
