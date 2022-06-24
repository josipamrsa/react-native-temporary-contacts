import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ViewContactsScreen() {
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
    <View>
      <Text>View added contacts</Text>
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
