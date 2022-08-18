import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, FlatList } from 'react-native';

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
                    setContacts(res.sort((a, b) => a.firstName.localeCompare(b.firstName)));
                })
                .catch(err => showToast(err.message, 2.5));
        });

        return refreshData;
    }, [navigation]);

    const renderContacts = ({ item }) => {
        return <UpdateCard
            key={item.userId}
            contact={item}
            updateContact={updateCurrentContact}
            deleteContact={deleteCurrentContact} />
    }

    const updateCurrentContact = (updatedContact) => {
        DatabaseConnection.updateContact(db, updatedContact)
            .then(res => {
                // TODO - fix this mess... better
                let [selected, index] = [
                    contacts.find(x => x.userId === updatedContact.userId),
                    contacts.findIndex(x => x.userId === updatedContact.userId)];

                let updated = {
                    ...updatedContact,
                    keepFor: selected.keepFor,
                    deletionDate: selected.deletionDate,
                    temporary: selected.temporary
                };

                let refreshed = contacts
                    .filter(contact => contact.userId !== updated.userId)
                    .concat(updated)
                    .sort((a, b) => a.firstName.localeCompare(b.firstName));
                setContacts(refreshed);

            })
            .catch(err => console.log(err));
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
            {contacts.length > 0 ? <FlatList data={contacts} renderItem={renderContacts} /> : <NoDisplay />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '5%',
    },
});
