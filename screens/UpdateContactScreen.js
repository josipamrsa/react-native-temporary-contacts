import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import { DatabaseConnection } from '../database/database-connect';
import UpdateCard from '../components/UpdateCard';
import NoDisplay from '../components/NoDisplay';

const db = DatabaseConnection.getConnection();

export default function UpdateContactScreen({ navigation }) {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const refreshData = navigation.addListener('focus', () => {
            DatabaseConnection.viewContacts(db)
                .then(res => {
                    setContacts(res);
                })
                .catch(err => showToast(err.message, 2.5));
        });

        return refreshData;
    }, [navigation]);

    const updateCurrentContact = (updatedContact) => {
        console.log("updated");
    }

    const deleteCurrentContact = (uid) => {
        Alert.alert(
            "Contact deletion confirm",
            "Are you sure you wish to delete this contact?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        DatabaseConnection.deleteContact(db, uid)
                            .then(res => {
                                setContacts(contacts.filter(contact => contact.userId !== uid))
                                console.log("deleted");
                            })
                            .catch(err => console.log(err))
                    }
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            {contacts.length > 0 ? contacts.map((contact, i) =>
                <UpdateCard
                    key={i}
                    contact={contact}
                    updateContact={updateCurrentContact}
                    deleteContact={deleteCurrentContact} />) : <NoDisplay />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '5%',
    },
});
