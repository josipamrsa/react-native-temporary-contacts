import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [initialContact, setInitialContact] = useState(''); // for testing purposes

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({});

        if (data.length > 0) {
          const contact = data[0];
          console.log(Object.keys(contact))
          setInitialContact(contact);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text>Name: {initialContact['firstName']} {initialContact['name']}</Text>
        <Text>Contact type: {initialContact['contactType']}</Text>
      </View>

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
    margin: '5%',
  },
});
