import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const JounralEntriesScreen = () => {

    // get journal entries from firestore, order them
  return (
    <View style={styles.wholeScreen}>
        <Text style={styles.header}>Journal entries</Text>
        <ScrollView style={styles.container}>
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