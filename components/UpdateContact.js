import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import ContactForm from './ContactForm';

export default function UpdateContact({ contact, setIsEdit, update}) {
    return (
        <View>
            <ContactForm contact={contact} contactAction={update} btnDescription={"Update contact"} />
        </View>
    );
}
