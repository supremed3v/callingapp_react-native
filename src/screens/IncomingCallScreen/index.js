import {View, Text, StyleSheet, ImageBackground, Pressable, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import bg from '../../../assets/images/background-img.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useRoute, useNavigation} from '@react-navigation/native'
import { Voximplant } from 'react-native-voximplant';

export default function IncomingCallScreen() {

    const [caller, setCaller] = useState(null)

    const route = useRoute()
    const navigation = useNavigation()
    const {call} = route.params;

    useEffect(() => {

      setCaller(call.getEndpoints()[0].displayName)

      call.on(Voximplant.CallEvents.Disconnected, callEvent =>{
        navigation.navigate("Contacts")
      })

      return () => {
        call.off(Voximplant.CallEvents.Disconnected)
      }
     }, [])
    

    const onDecline = () => {
      call.decline()
    }

    const onAccept =() => {
      navigation.navigate("Calling", {
        call,
        isIncomingCall: true,
      })
    }
  return (
    <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
      <Text style={styles.name}>{caller}</Text>
      <Text style={styles.contactNumber}>WhatsApp Video...</Text>
      <View style={[styles.row, {marginTop: 'auto'}]}>
        <View style={styles.iconsContainer}>
          <Ionicons name="alarm" color="white" size={30} />
          <Text style={styles.iconText}>Remind me</Text>
        </View>
        <View style={styles.iconsContainer}>
          <Entypo name="message" color="white" size={30} />
          <Text style={styles.iconText}>Message</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Decline Button */}
        <Pressable onPress={onDecline} style={styles.iconsContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>

        {/* Accept Button */}
        <Pressable onPress={onAccept} style={styles.iconsContainer}>
          <View
            style={[styles.iconButtonContainer, {backgroundColor: '#2e7bff'}]}>
            <Feather name="check" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Accept</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50,
    marginBottom: 10,
  },
  contactNumber: {
    fontSize: 18,
    color: 'white',
  },

  bg: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 50,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    color: 'white',
    marginTop: 10,
  },

  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
});
