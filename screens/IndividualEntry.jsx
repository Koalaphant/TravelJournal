import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { getDoc,doc, collection } from "firebase/firestore";
import { db } from "../services/config.js";

const IndividualEntry = ({route}) => {
  const [journal, setJournal] = useState({});
  const entry = route.params.params
    console.log(entry, " <<PROPS");
  useEffect(() => {
  getDoc(doc(db, "Traveller2", 'England', 'Trip1', entry)).then((data) =>{
    if(data.exists()){
        setJournal(data.data())
    }
}).catch((error) =>{
    console.log(error)
})
}, []);

  return (
   
                <View style={styles.wholeScreen}>
                <Text style={styles.header}>{journal.title}</Text>
                <Text style={styles.box}>Location: {journal.location}</Text>
                <Text style={styles.box}>Details: {journal.journalentry}</Text>
                </View>
     
  );
};

const styles = StyleSheet.create({
  wholeScreen: {
    backgroundColor: '#FFEDDF'
  },
  header: {
    backgroundColor: "#D76778",
    textAlign: "center",
    color: "white",
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8
  },
  box: {
    backgroundColor: "#FFEDDF",
    textAlign: "center",
    color: "#D76778",
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8
  },
  box1: {
    backgroundColor: "violet",
  },
});

export default IndividualEntry;