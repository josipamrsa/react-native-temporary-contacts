import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { DatabaseConnection } from '../database/database-connect';
import UpdateCard from '../components/UpdateCard';

const db = DatabaseConnection.getConnection();

export default function UpdateContactScreen({ navigation }) {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const refreshData = navigation.addListener('focus', () => {
            DatabaseConnection.viewContacts(db)
                .then(res => {
                    //console.log(res[0].firstName);
                    setContacts(res);
                })
                .catch(err => showToast(err.message, 2.5));
        });

        return refreshData;
    }, [navigation]);

    return (
        <View style={styles.container}>
            {contacts.map((contact, i) =>
                <UpdateCard key={i} contact={contact} />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '5%',
    },
});
