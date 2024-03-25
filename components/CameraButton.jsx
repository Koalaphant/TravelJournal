import * as React from 'react';
import {Text,StyleSheet, TouchableOpacity} from 'react-native';
import {Entypo} from '@expo/vector-icons'

const CameraButton = ({title, onPress, icon, color}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D76778',
        paddingRight:5,
        borderRadius: 10,
        marginBottom:10,
        marginHorizontal: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#f1f1f1',
        marginLeft: 10
    }
})


export default CameraButton