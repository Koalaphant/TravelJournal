import React from 'react';
import {Text, View, StyleSheet, Button,Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Header = () => {
  const navigation = useNavigation();
  return (
    <>
    <View style={styles.container}>
      <Image source={require('../assets/journalbanner.jpg')} style={styles.banner} />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Pocket Journal</Text>
        <Text style={styles.subHeading}>A travel journey experience</Text>
          </View>
        </View>
        
    </View>
        <View style={styles.navbar}>
        <TouchableOpacity style={styles.buttons}  onPress={() =>
          navigation.navigate('Home')
        }>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.buttons}  onPress={() =>
          navigation.navigate('Profile')
        }>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttons}  onPress={() =>
          navigation.navigate('Test')
        }>
          <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity>
       
    </View>
    </>
  );
};

const styles = StyleSheet.create({
    container:{
      marginTop: 0,
      marginBottom: 0,
    },
    header: {
      borderRadius:20,
      marginVertical: 10,
      alignSelf: 'center',
      padding: 8,
    },
    title: {
      color: '#D76778',
      width: 'auto',
      fontSize: 40,
      fontWeight: 'bold',
      marginVertical: 15,
      alignSelf: 'center',
    },
    subHeading: {
      alignSelf: 'center',
      color: '#D76778',
      width: 'auto',
      fontSize: 20,
      fontWeight: 'bold',
    },
    navbar: {
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-around',
      marginTop:0,
      backgroundColor: '#D76778',
    },
    buttonText:{
      color:'#fff',
      fontSize: 16,
      fontWeight: 'bold',
      paddingVertical: 5,
    },
    banner:{
      width:'auto',
      height:150
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 237, 223,0.7)'
    }
    
  });

export default Header;
