import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform, Image } from 'react-native';
import React, { useState, useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Constants } from 'expo-constants';



export default function App() {
  const [image, setImage] = useState(null);

  useEffect(async() => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("permission denied!")
        }
      }
  },[])

  const PickImage = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [4,3],
      })
      console.log(result)
      if (!result.cancelled) {
        setImage(result.uri)
      }
  }


  return (
    <View style={styles.container}>
      <Button title='Choose Image' onPress={PickImage} />
      {image && <Image source={{uri:image}} style={{
        width: 200,
        height: 200,
      }} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
