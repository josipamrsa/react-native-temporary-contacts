import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import ContactForm from './ContactForm';

export default function UpdateContact({ contact, setIsEdit }) {
    const updateCurrentContact = (updatedContact) => {
        console.log("updated");
        //setIsEdit(false);
    }

    return (
        <View>
            <ContactForm contact={contact} contactAction={updateCurrentContact} btnDescription={"Update contact"} />
        </View>
    );
}
