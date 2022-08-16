import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Switch,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import CustomizableButton from '../components/CustomizableButton';

export default function ContactForm({ contact, contactAction, btnDescription }) {
    const [firstName, setFirstName] = useState(contact.firstName || "");
    const [lastName, setLastName] = useState(contact.lastName || "");
    const [phoneNumber, setPhoneNumber] = useState(contact.phone || "");
    const [location, setLocation] = useState(contact.location || "");
    const [description, setDescription] = useState(contact.description || "");
    const [isTemporary, setIsTemporary] = useState(!!contact.keepFor);
    const [keepFor, setKeepFor] = useState(contact.keepFor || "");

    const [openDropdown, setOpenDropdown] = useState(false);
    const [keepItemValues, setKeepItemValues] = useState([
        { label: 'One day', value: 1 },
        { label: 'One week', value: 7 },
        { label: 'One month', value: 30 }
    ]);

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

    const handleIsTemporary = () => {
        setIsTemporary(previousState => !previousState);
    }

    const clearFields = () => {
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setLocation("");
        setDescription("");
        setIsTemporary(true);
        setKeepFor("");
    }

    const doContactAction = () => {
        let newOrUpdatedContact = {
            firstName,
            lastName,
            phoneNumber,
            location,
            description,
            isTemporary,
            keepFor,
        }
        contactAction(newOrUpdatedContact);
        clearFields();
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

            <View style={styles.temporarySelect}>
                <Switch
                    trackColor={{ false: "#767577", true: "#3d4a87" }}
                    thumbColor={isTemporary ? "#7891ff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={handleIsTemporary}
                    value={isTemporary}
                />

                <Text>Temporary contact?</Text>
            </View>

            {isTemporary && <View style={styles.contactLengthArea}>
                <Text>Keep contact for</Text>
                <DropDownPicker
                    open={openDropdown}
                    value={keepFor}
                    items={keepItemValues}
                    setOpen={setOpenDropdown}
                    setValue={setKeepFor}
                    setItems={setKeepItemValues}
                />
            </View>}

            <CustomizableButton
                button={styles.button}
                description={btnDescription}
                action={() => { doContactAction() }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        margin: '5%',
        backgroundColor: "#f3f3f3",
        padding: "10%",
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

    button: {
        backgroundColor: "lightsalmon"
    },

    input: {
        backgroundColor: "#c3c3c3",
        padding: 10,
        borderRadius: 5,
        marginBottom: "2%"
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
