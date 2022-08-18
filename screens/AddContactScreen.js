import React, { useEffect } from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import ContactForm from '../components/ContactForm';

import { DatabaseConnection } from '../database/database-connect';
import useNotifications from '../hooks/useNotifications';
import { checkIfEmptyFields } from '../utils/Helpers';

const db = DatabaseConnection.getConnection();

export default function AddContactScreen({ navigation }) {
    const {
        sendPushNotification,
        expoPushToken,
        showToast
    } = useNotifications();

    useEffect(() => {
        const refreshData = navigation.addListener('focus', () => {
            
        });

        return refreshData;
    }, [navigation]);

    const saveContact = (contact) => {
        let isContactDataFilled = checkIfEmptyFields(
            [
                contact.firstName,
                contact.lastName,
                contact.phoneNumber,
                contact.location,
                contact.description
            ]);

        let isTemporarySet = contact.isTemporary && contact.keepFor === "";

        if (!isContactDataFilled) {
            showToast("Fill out all fields!", 0.3);
            return;
        }

        if (isTemporarySet) {
            showToast("Please select the period in which you wish to keep your temporary contact!", 1.8);
            return;
        }

        console.log(contact);
        DatabaseConnection.addContact(db, contact).then(res => {
            showToast("Contact added!", 2.6);
            //sendPushNotification(expoPushToken, "Contact added!");
        }).catch((err) => {
            showToast(err.message, 2.6);
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ContactForm contact={{}}
                contactAction={saveContact}
                btnDescription="Save contact" />
        </TouchableWithoutFeedback>
    );
}

