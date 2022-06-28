import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as Contacts from 'expo-contacts';

export default function ViewContactsScreen({ navigation }) {
  /* useEffect(() => {
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
}, []); */

  return (
    <View style={styles.container}>
      <Text>view added contacts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
  },
});
