import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';


const Footer = () => {

  return (
    <View style={styles.container}>
        <>       
      <TouchableOpacity style={styles.buttonLayout}>
        <Image source={require('../assets/love.png')} style={{width:50, height: 50}}/>
      </TouchableOpacity>

     
    
     </>
     </View>
  );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#D76778',
    },
    buttonLayout: {
        backgroundColor: '#D76778', 
        padding: 10, 
        alignSelf: 'center', 
        position: 'relative', 
        bottom: 30, 
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
    },

    
  });

export default Footer;