
import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./components/header";
import Tabs from "./navigation/tabs";
import Gallery from "./components/Gallery";
import Login from "./screens/Login";
import { FIREBASE_AUTH } from "./services/config";
import { onAuthStateChanged } from "firebase/auth";
import IndividualEntry from "./screens/IndividualEntry";

// export const UserContext = React.createContext()





const Stack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const LoginLayout = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
};



function TabNav() {
  return (
    <Tabs />
  );
}

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);
  return (
    // <UserContext.Provider value={user}>
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        {user ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={TabNav}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Gallery"
              component={Gallery}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="IndividualEntry"
              component={IndividualEntry}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <LoginLayout />
        )}

      </SafeAreaView>
    </NavigationContainer>
    // </UserContext.Provider>
  );
};

export default App;
