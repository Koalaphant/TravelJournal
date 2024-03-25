import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/header';
import Tabs from './navigation/tabs';
import Gallery from './components/Gallery';

const Stack = createNativeStackNavigator();

function TabNav() {
  return (
    <Tabs />
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNav} options={{ headerShown:false }}/>
      <Stack.Screen name="Gallery" component={Gallery} options={{ headerShown:false }}/>
    </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
