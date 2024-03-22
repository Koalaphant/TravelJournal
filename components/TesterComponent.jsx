import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Text, View, StyleSheet} from 'react-native';


const TesterComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/singlesearch/shows?q=avengers');
      const json = await response.json();
      setData(json);
     
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.siteWide}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
        <Text style={styles.heading}>Pocket Journal</Text>
        <Text className="decoration-white">TV Show title: {data.name}</Text>
        <Text>Link to read more: {data._links.self.href}</Text>
        <Image source={{uri:data.image.medium}} style={styles.tinyLogo}/>
        
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    siteWide: {
      backgroundColor: '#FFEDDF',
      color: '#D76778',
    },
    tinyLogo: {
      width: 150,
      height: 250,
    },
    heading:{
          fontSize: 30,
          fontWeight: 'bold',
          color: '#D76778',
          textAlign: 'center'
        },
        subhead:{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white'
        }
    
  });

export default TesterComponent;