import React from 'react';
import {Text, View, StyleSheet, Button,Image} from 'react-native';
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
        <Button
        title="Home"
        onPress={() =>
          navigation.navigate('Home')
        }
        color='#D76778'
      />
        <Button
        title="Profile"
        onPress={() =>
          navigation.navigate('Profile')
        }
        color='#D76778'
      />
       <Button
        title="Test"
        onPress={() =>
          navigation.navigate('Test')
        }
        color='#D76778'
      />

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
      marginTop:0,
      backgroundColor: '#D76778'
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
