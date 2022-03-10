import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import CallActionBox from '../../components/CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function CallingScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const user = route?.params?.user
  const goBack = () => {
    navigation.pop();
  };
  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.backButton}>
        <Ionicons name="chevron-back" color="white" size={30} />
      </Pressable>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.contactNumber}>Ringing +123 4567 890</Text>
      </View>

      <CallActionBox />
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
