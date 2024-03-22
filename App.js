import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, StyleSheet} from 'react-native';
import Header from './components/header';
import Home from './components/Home';
import Footer from './components/Footer';
import Profile from './components/Profile';
import TesterComponent from './components/TesterComponent'


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={styles.siteWide}>
        <NavigationContainer>
        <Header />
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center', contentStyle:{backgroundColor:'#FFEDDF'}
     }} >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home'}}
        />
          <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />
         <Stack.Screen
          name="Test"
          component={TesterComponent}
          options={{title: 'Test'}}
        />

        </Stack.Navigator>
        <Footer />
          </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  siteWide: {
    backgroundColor: '#FFEDDF',
    color: '#D76778',
    flex:1, 
  },
  title: {
    backgroundColor: '#D76778',
    color: '#ffffff'
  }
});
