import React from "react";
import { StyleSheet, Button, Text, View, Image, Alert, TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const UserScreen = () => {

  const handlePress = () => {
    Alert.alert('Change your profile picture')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome User</Text>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <MaterialCommunityIcons name="camera-plus-outline" size={24} color="black" />
      </TouchableOpacity>

      <Image style={styles.profilePic} source={{uri:'https://static.wikia.nocookie.net/fortnite/images/0/07/Marcus_Fenix_-_Outfit_-_Fortnite.png/revision/latest?cb=20220627163539'}}/>

     <View>
        <Text>First name</Text>
     </View>
     <View>
        <Text>Last name</Text>
     </View>
     <View>
        <Text>Email</Text>
     </View>
     <View>
        <Text>Mobile Number</Text>
     </View>
      
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#8fcbbc",
  },
  header: {
    marginTop: 12,
    marginBottom: 18,
    fontSize: 29,
    fontWeight: 'bold', 
  },
  profilePic: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 100,
    borderColor: '#D76778',
    borderWidth: 3,
  },
  button: {
    position: 'fixed'
  }
});
