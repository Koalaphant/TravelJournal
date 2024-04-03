import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button, ScrollView, TextInput, Image } from "react-native";
import AddFriend from "../utils/searchFriends";
import { doc, getDoc, collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../services/config";
import {UserContext} from "../contexts/UserContext";
import {flag} from "country-emoji";

const FriendsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {user} = useContext(UserContext)
  const [friends, setFriends] = useState();

  useEffect(() =>{
    const fetchFriends = async () =>{
      const docRef = doc(db, "Users", user.uid)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        setFriends(docSnap.data().friends)
      }

      
      const friendsWithCountriesPromises = friends.map(async (friend) => {
        const friendId = friend.uid;
        const q = query(collection(db, "Entries"), where("UID", "==", friendId));
        const qSnap = await getDocs(q); 
        let countries = [];
        qSnap.forEach((doc) => { 
          if (doc.data().country && !countries.includes(doc.data().country)) {
            countries.push(flag(doc.data().country));
          countries = [...new Set(countries)];
          }
        });
        return {
          ...friend,
          countries,
        };
      });

      
      const friendsWithCountries = await Promise.all(friendsWithCountriesPromises);
      setFriends(friendsWithCountries);
      console.log(friendsWithCountries)

    
    }
    fetchFriends()
  },[user.uid])

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for friends..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />

      <ScrollView style={styles.contentContainer}>
        {friends?.map(friend => (
          <View key={friend.uid} style={styles.nameCard}>
            <Image source={{uri: friend.imageURL}} style={styles.image}/>
            <Text style={styles.cardText}>{friend.displayName}</Text>
            <Text style={styles.countryText}>{friend.countries?.join(', ')}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFEDDF",
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  searchBar: {
    fontSize: 18,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  nameCard: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
    shadowRadius: 2,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  countryText: {
    fontSize: 14,
    color: '#666',
  }
});
