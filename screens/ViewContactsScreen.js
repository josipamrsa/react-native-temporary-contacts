import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DisplayUserCard from '../components/DisplayUserCard';
import NoDisplay from '../components/NoDisplay';

import * as Contacts from 'expo-contacts';
import { DatabaseConnection } from '../database/database-connect';

const db = DatabaseConnection.getConnection();

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

  const [fullContacts, setFullContacts] = useState([]);
  // TODO - lift state to App
  const [error, setError] = useState("");

  useEffect(() => {
    const refreshData = navigation.addListener('focus', () => {
      DatabaseConnection.viewContacts(db, setFullContacts, setError);
    });

    return refreshData;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {
        fullContacts.length !== 0 ?
          <DisplayUserCard fullContacts={fullContacts} /> :
          <NoDisplay />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
  },
});
