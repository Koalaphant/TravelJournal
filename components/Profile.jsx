import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';


const Profile = () => {

  return (
    <View style={styles.container}>
        <>
        <Text style={styles.title}>Marcus Fenix</Text>
        <Image style={styles.profilePic} source={{uri:'https://static.wikia.nocookie.net/fortnite/images/0/07/Marcus_Fenix_-_Outfit_-_Fortnite.png/revision/latest?cb=20220627163539'}}/>
        <Text style={styles.subHeading}>Some info...</Text>
        
        
        </>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#FFEDDF',
      marginVertical: 30,
    },
    title: {
      backgroundColor: '#FFEDDF',
      color: '#D76778',
      width: 'auto',
      fontSize: 40,
      fontWeight: 'bold',
      marginVertical: 10,
      alignSelf: 'center',
    },
    subHeading: {
      alignSelf: 'center',
      color: '#D76778',
      width: 'auto',
      fontSize: 20,
      fontWeight: 'bold',
    },
    profilePic: {
        width:150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 100,
        borderColor: '#D76778',
        borderWidth: 3,
    }
    
  });

export default Profile;