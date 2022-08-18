import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Switch,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import CustomizableButton from './CustomizableButton';

export default function EditContactData({ contact, contactAction, btnDescription }) {
    const [firstName, setFirstName] = useState(contact.firstName || "");
    const [lastName, setLastName] = useState(contact.lastName || "");
    const [phoneNumber, setPhoneNumber] = useState(contact.phone || "");
    const [location, setLocation] = useState(contact.location || "");
    const [description, setDescription] = useState(contact.description || "");

    const handleFirstName = (data) => {
        setFirstName(data);
    }

    const handleLastName = (data) => {
        setLastName(data);
    }

    const handlePhoneNumber = (data) => {
        if (isNaN(data)) return;
        setPhoneNumber(data);
    }

    const handleLocation = (data) => {
        setLocation(data);
    }

    const handleDescription = (data) => {
        setDescription(data);
    }

    const clearFields = () => {
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setLocation("");
        setDescription("");
    }

    const doContactAction = () => {
        let newOrUpdatedContact = {
            userId: contact.userId,
            firstName,
            lastName,
            phoneNumber,
            location,
            description
        }
        contactAction(newOrUpdatedContact);
        //clearFields();
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="First name"
                value={firstName}
                onChangeText={handleFirstName}
                style={styles.input}
            />

            <TextInput
                placeholder="Last name"
                value={lastName}
                onChangeText={handleLastName}
                style={styles.input}
            />

            <TextInput
                placeholder="Phone number"
                value={phoneNumber}
                onChangeText={handlePhoneNumber}
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                placeholder="Location"
                value={location}
                onChangeText={handleLocation}
                style={styles.input}
            />

            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={handleDescription}
                style={styles.input}
            />

            <CustomizableButton
                button={styles.button}
                description={btnDescription}
                action={() => { doContactAction() }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: "white",
        padding: 30,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
    },

    button: {
        backgroundColor: "lightsalmon"
    },

    input: {
        backgroundColor: "#c3c3c3",
        padding: 10,
        borderRadius: 5,
        marginBottom: "2%",
    },

    temporarySelect: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row"
    },

    contactLengthArea: {
        marginBottom: "2%",
        marginTop: "2%",
    }
});
