import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import EditContactData from './EditContactData';

export default function UpdateContact({ contact, setIsEdit, update}) {
    return (
        <View>
            <EditContactData contact={contact} contactAction={update} btnDescription={"Update contact"} />
        </View>
    );
}
