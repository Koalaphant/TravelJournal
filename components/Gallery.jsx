import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Image, Button} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from './CameraButton';



const Gallery = () => {
  const[hasCameraPermission, setHasCameraPermission] = useState(null)
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const cameraRef = useRef(null)


  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, [])

  const takePicture = async () => {
    if(cameraRef) {
      try{
        const data = await cameraRef.current.takePictureAsync();
        console.log(data)
        setImage(data.uri)
      }catch(error){
        console.log(error)
      }

    }
  }
  
const saveImage = async () => {
    if(image){
        try{
            await MediaLibrary.createAssetAsync(image);
            alert('Picture saved!')
            setImage(null)
        }
        catch(error){
           console.log(error)
        }
}
}

  if(hasCameraPermission === false){
    return <Text>No access to camera</Text>
  }

  return (
    <>

      <View style={styles.container}>
        {!image ?
      <Camera
      style={styles.camera}
      type={type}
      flashMode={flash}
      ref={cameraRef}
      >
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 30,
        }}>
            <Button color='#D76778' title='change lens' icon={'retweet'} onPress={() =>{
                setType(type === CameraType.back ? CameraType.front : CameraType.back)
            }}/>
            <Button color='#D76778' title='Flash' icon={'flash'} onPress={() =>{
                setFlash(flash === Camera.Constants.FlashMode.off 
                    ? Camera.Constants.FlashMode.on 
                    : Camera.Constants.FlashMode.off
                    )
            }}/>
        </View>
        
        </Camera>
        :
        <Image source={{uri: image}} style={styles.camera} />
        }
      </View>
      <View style={{paddingBottom: 25}}>
        {image?
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 50,
        }}>
            <Button color='#D76778' title={'Re-take'} icone='retweet' onPress={() =>setImage(null)} />
            <Button color='#D76778' title={'Save'} icone='check' onPress={saveImage} />
        </View>
        :
        <Button color='#D76778' title={'Take a picture'} icone='camera' onPress={takePicture} />
        }
      </View>
       </>
  );
};

const styles = StyleSheet.create({
   container: {
    flex:1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 20
   },
   camera: {
    flex:1,
    borderRadius: 20,
   }
  
    
  });

export default Gallery