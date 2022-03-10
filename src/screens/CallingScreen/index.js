import {View, Text, StyleSheet, Pressable, PermissionsAndroid, Alert} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import CallActionBox from '../../components/CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Voximplant } from 'react-native-voximplant';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA
]

export default function CallingScreen() {
  const [permissionGranted, setPermissionGranted] = useState(false)
  const navigation = useNavigation();
  const route = useRoute();
  const {user, call: incomingCall, isIncomingCall} = route?.params;

  const [callStatus, setCallStatus] = useState("Initializing...")

  const voximplant = Voximplant.getInstance()
  const call = useRef(incomingCall)



  const goBack = () => {
    navigation.pop();
  };

  useEffect(() => {

    const getPermissions = async () =>{

    const granted = await PermissionsAndroid.requestMultiple(permissions);
    const recordAudioGranted =
      granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
    const cameraGranted =
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
    if (!cameraGranted || !recordAudioGranted) {
      Alert.alert('Permissions not granted');
    } else {
      setPermissionGranted(true);
    }
  }

  if (Platform.OS === "android"){

    getPermissions()
  } else {
    setPermissionGranted(true);
  }
  }, []);


  useEffect(() => {
    if (!permissionGranted){
      return
    }

    const callSettings = {
      video: {
        sendVideo: true,
        receiveVideo: true,
      }
    }
    
    const makeCall = async () => {
      call.current = await voximplant.call(user.user_name, callSettings);
      subscribeToCallEvents()
    }

    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, (callEvent)=>{
        showError(callEvent.reason)
      });
      call.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent)=>{
        setCallStatus("Calling...")
      });
      call.current.on(Voximplant.CallEvents.Connected, callEvent =>{
        setCallStatus("Connected")
      })
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent =>{
        navigation.navigate("Contacts")
      })
    }
    const showError = (reason) =>{
      Alert.alert("Call Failed", `Reason: ${reason}`, [
        {
          text: "Ok",
          onPress: navigation.navigate('Contacts')
        }
      ])
    }
    if(isIncomingCall){
      answerCall()
    } else{
      makeCall()
    }
    makeCall()

    return()=> {
      call.current.off(Voximplant.CallEvents.Failed)
      call.current.off(Voximplant.CallEvents.ProgressToneStart)
      call.current.off(Voximplant.CallEvents.Connected)
      call.current.off(Voximplant.CallEvents.Disconnected)
    }
  }, [permissionGranted])
  
  const onHangupPress = () =>{
    call.current.hangup()
  }

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.backButton}>
        <Ionicons name="chevron-back" color="white" size={30} />
      </Pressable>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.contactNumber}>{callStatus}</Text>
      </View>

      <CallActionBox onHangupPress={onHangupPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  contactNumber: {
    fontSize: 18,
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
});
