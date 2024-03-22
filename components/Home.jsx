import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';

const Home = () => {

  return (
    <>
      <ScrollView style={styles.home}>
        <>
        <Text style={styles.title}>Start your journey here...</Text>
        <Text style={styles.intro}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam blandit lacinia nulla, in vehicula eros mattis sed. Nunc eu ullamcorper libero. Suspendisse in ultrices tortor. Aliquam nunc nisi, vehicula eget suscipit quis, tristique quis risus. Vivamus vel turpis et eros faucibus rutrum. Proin accumsan nibh convallis, tempus purus id, fringilla felis. Cras sit amet molestie tortor. Aenean eget nibh euismod, semper purus ut, ornare nisi. 
        </Text>
      <View style={styles.buttonLayout}>
        <Image source={require('../assets/star.png')} style={styles.buttonImg} />
        <Image source={require('../assets/star.png')} style={styles.buttonImg} />
        <Image source={require('../assets/star.png')} style={styles.buttonImg} />
        <Image source={require('../assets/star.png')} style={styles.buttonImg} />
        <Image source={require('../assets/star.png')} style={styles.buttonImg} />
      </View>
        <View style={styles.buttonLayout}>
        <TouchableOpacity style={styles.buttons}>
        <Text style={styles.buttonText}>Submit</Text>
        <Image source={require('../assets/left-arrow.png')} style={styles.buttonImg}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttons}>
        <Text style={styles.buttonText}>Gallery</Text>
        <Image source={require('../assets/gallery.png')} style={styles.buttonImg}/>
      </TouchableOpacity>
      </View>
        </>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
    home: {
        backgroundColor: '#FFEDDF',
    },
    title: {
      backgroundColor: '#FFEDDF',
      color: '#D76778',
      width: 'auto',
      fontSize: 30,
      fontWeight: 'bold',
      marginVertical: 40,
      alignSelf: 'center',
    },
    intro: {
      backgroundColor: '#ffffff',
      alignSelf: 'center',
      color: '#D76778',
      fontSize: 15,
      marginHorizontal: 12,
      marginVertical: 10,
      borderRadius: 12,
      padding: 10,
      textAlign: 'center',
      borderColor: '#D76778',
      borderWidth: 2,
    },
    buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    },
    buttons:{
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#D76778', 
    paddingLeft: 8,
    borderRadius:4,
    alignSelf: 'center',
    },
    buttonText:{
    fontSize:20,
    color: 'white'
    },
    buttonImg:{
    width:40, 
    height: 40,
    },
    mainArrow:{
        width:40, 
        height: 40,
        marginLeft: 20,
        backgroundColor: '#D76778',
        borderRadius: 20,
    },
     
  });

export default Home;