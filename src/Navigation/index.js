import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'

import CallingScreen from '../screens/CallingScreen';
import ContactsScreen from '../screens/ContactsScreen';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import CallScreen from '../screens/CallScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{title: "Login", headerTitleAlign: "center"}} />
            <Stack.Screen name="Contacts" component={ContactsScreen}/>
            <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Call" component={CallScreen}  />
            <Stack.Screen name="Calling" component={CallingScreen} />
            <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
            </Stack.Group>
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation