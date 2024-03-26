import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import {getDoc, doc } from "firebase/firestore";
import {db} from '../services/config.js'

const JounralEntriesScreen = () => {
    const [journal, setJournal] = useState({})

    getDoc(doc(db, "journalentry", 'paristester')).then((data) =>{
        if(data.exists()){
            setJournal(data.data())
        }
    }).catch((error) =>{
        console.log(error)
    })
    // get journal entries from firestore, order them
  return (
    <View style={styles.wholeScreen}>
        <Text style={styles.header}>Journal entries</Text>
        <ScrollView style={styles.container}>

        <View>
                <Text>{journal.title}</Text>
                <Text>{journal.location}</Text>
                <Text>{journal.rating}</Text>
                <Text>{journal.journalentry}</Text>
            </View>

            <Text style={[styles.box1, styles.box]}>JounralEntry1</Text>
            <Text style={[styles.box1, styles.box]}>JounralEntry2</Text>
            <Text style={[styles.box1, styles.box]}>JounralEntry3</Text>
            <Text style={[styles.box1, styles.box]}>JounralEntry4</Text>
            <Text style={[styles.box1, styles.box]}>JounralEntry1</Text>
            <Text style={[styles.box1, styles.box]}>JounralEntry2</Text>
            <Text style={[styles.box1, styles.box]}>JounralEntry3</Text>
            <Text style={[styles.box1, styles.box]}>JounralEntry4</Text>
        </ScrollView>
    </View>


  )
}

const styles = StyleSheet.create({
    wholeScreen:{
        flex:1,
    },
    header:{
        backgroundColor: 'grey',
        textAlign: 'center',
        color: 'white',
        height: '10%',
    },
    container: {
        backgroundColor: '#ddd',
        flexGrow: 1,
    },
    box:{
        height: 30,
        margin: 50,
    },
    box1:{
        backgroundColor: 'violet',
    },
})

export default JounralEntriesScreen