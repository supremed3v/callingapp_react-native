/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import ContactsScreen from './src/screens/ContactsScreen';



const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />

      <ContactsScreen/>
    </SafeAreaView>
  );
};

export default App;
