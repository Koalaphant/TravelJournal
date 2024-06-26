import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable
} from "react-native";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../services/config.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import {Picker} from '@react-native-picker/picker'

const JournalEntriesScreen = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {user} = useContext(UserContext);
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState();
  const countryFromParams = route.params?.country

  useEffect(()=>{
    if(countryFromParams !== undefined){
      setCountry(countryFromParams)
    }
  },[countryFromParams])

  useEffect(() => {
    const fetchCountries = async () => {
      const q = query(collection(db, "Entries"), where("UID", "==", user.uid)); 
      const querySnapshot = await getDocs(q);
      const countriesData = querySnapshot.docs.map((doc) => (
        doc.data().country
      ));
      setCountries(countriesData);
    };
  
    fetchCountries();
  }, [country]);
 

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        
        let effectiveCountry = countryFromParams || country ||countries?.[0];
        if (!user.uid || !effectiveCountry) {
          console.log("User UID or effectiveCountry is undefined.");
          return; 
        }
        const entriesRef = collection(db, "Entries");
        const q = query(
          entriesRef,
          where("UID", "==", user.uid),
          where("country", "==", effectiveCountry) 
        );
        const querySnapshot = await getDocs(q);

        const journalEntriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJournalEntries(journalEntriesData);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, [country, countryFromParams, user.uid]); 
  
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }
  
  function close() {
    pickerRef.current.blur();
  }
  return (
    <View style={styles.wholeScreen}>
      <ScrollView>
      {!route.params && (
        <View style={{flex:1}}>
        <Text style={{color:'#D76778',width: 200, alignSelf:'center', flex:0.5, textAlign:'center', fontWeight: 'bold'}}>Select country</Text>
      <Picker 
      style={{backgroundColor: '#fff', color:'#D76778',width: 200, alignSelf:'center', flex:0.5}}
          ref={pickerRef}
          selectedValue={country} 
          onValueChange={(country) => {
            setCountry(country);
          }}
        >
          {countries?.map((country, index) => ( 
            <Picker.Item style={styles.picker} label={country} value={country} key={index} />
          ))}
        </Picker>
        </View>
      )}
        {journalEntries.map((entry) => (
          <ScrollView key={entry.id} style={styles.box}>
            <Pressable
              onPress={() =>
                navigation.navigate("IndividualEntry", { id: entry.id })
              }
            >
              <Text style={styles.entries}>{entry.title}</Text>
            </Pressable>
          </ScrollView>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    backgroundColor: '#FFEDDF'
  },
  picker: {
    height: 50,
    width: 100,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center'
  },
  box: {
    backgroundColor: "#D76778",
    borderRadius: 8,
    margin: 20
  },
  entries: {
    fontSize: 25,
    color: '#fff',
    padding:10,
    textAlign: 'center'
  }
});

export default JournalEntriesScreen;
