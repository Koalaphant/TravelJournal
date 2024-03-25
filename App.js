import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, StyleSheet} from 'react-native';
import Header from './components/header';
import Tabs from './navigation/tabs';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
        <NavigationContainer>
          <Header />
          <Tabs/>
    
        
        </NavigationContainer>
  
  );
};

export default App;

