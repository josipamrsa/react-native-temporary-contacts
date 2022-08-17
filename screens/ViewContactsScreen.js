import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import DisplayContactCard from '../components/DisplayContactCard';
import NoDisplay from '../components/NoDisplay';

import { DatabaseConnection } from '../database/database-connect';
import useNotifications from '../hooks/useNotifications';

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

  const {
    sendPushNotification,
    expoPushToken,
    showToast
  } = useNotifications();

  useEffect(() => {
    const refreshData = navigation.addListener('focus', () => {
      DatabaseConnection.viewContacts(db)
        .then(res => setFullContacts(res))
        .catch(err => showToast(err.message, 2.5));
    });

    return refreshData;
  }, [navigation]);

  const renderContacts = ({ item }) => {
    return <DisplayContactCard contact={item} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {fullContacts.length !== 0 ?
          <FlatList data={fullContacts} renderItem={renderContacts} /> :
          <NoDisplay />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
  },

  cardsContainer: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: 10,
    borderRadius: 15,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
