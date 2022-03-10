import {View, StyleSheet, Pressable} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState} from 'react';

const CallActionBox = () => {

  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)

  const onReverseCamera = () => {
    console.warn("Reverse")
  }
  const onToggleCamera = () => {
    setIsCameraOn(currentValue => !currentValue)
  }
  const onToggleMicrophone = () => {
    setIsMicOn(currentValue => !currentValue)
  }
  const onHangup = () => {
    console.warn("Hangup!")
  }
  return (
    <View style={styles.buttonContainer}>


      <Pressable onPress={onReverseCamera} style={styles.iconButton}>
        <Ionicons name="ios-camera-reverse" size={30} color={'white'} />
      </Pressable>

      <Pressable onPress={onToggleCamera} style={styles.iconButton}>
        <MaterialIcons name={isCameraOn ?"camera-off" : "camera"} size={30} color={'white'} />
      </Pressable>
      <Pressable onPress={onToggleMicrophone} style={styles.iconButton}>
        <MaterialIcons name={isMicOn ? "microphone-off" : "microphone"} size={30} color={'white'} />
      </Pressable>
      <Pressable onPress={onHangup} style={[styles.iconButton, {backgroundColor: 'red'}]}>
        <MaterialIcons name="phone-hangup" size={30} color={'white'} />
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#333',
    padding: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 50,
  },
});

export default CallActionBox;
