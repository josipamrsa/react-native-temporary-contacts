import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Switch } from 'react-native';

import * as Contacts from 'expo-contacts';

import CustomizableButton from '../components/CustomizableButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { DatabaseConnection } from '../database/database-connect';

const db = DatabaseConnection.getConnection();

export default function AddContactScreen() {
    useEffect(() => {
        DatabaseConnection.dropTableTestable(db);
        DatabaseConnection.createContactTable(db);

        // FIXME - ONLY FOR TESTING PURPOSES - REWORK LATER

        const data = {
            firstName: "Josipa",
            lastName: "Mrša",
            phoneNumber: "0914444555"
        }

        DatabaseConnection.addContact(db, data);
        DatabaseConnection.viewContacts(db);
    }, []);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [isTemporary, setIsTemporary] = useState(true);
   
    const [openDropdown, setOpenDropdown] = useState(false);
    const [keepFor, setKeepFor] = useState("");
    const [keepItemValues, setKeepItemValues] = useState([
        { label: 'One day', value: 'day' },
        { label: 'One week', value: 'week' },
        { label: 'One month', value: 'month' }
    ]);

    const handleFirstName = (data) => {
        setFirstName(data);
    }

    const handleLastName = (data) => {
        setLastName(data);
    }

    const handlePhoneNumber = (data) => {
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

    const saveContact = () => {
        let newContact = {
            firstName,
            lastName,
            phoneNumber,
            location,
            description,
            isTemporary,
            keepFor
        }

        console.log(newContact);
    }

    return (
        <View style={styles.container}>
            <Text>Add a contact</Text>

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
                description={"Save contact"}
                action={() => { saveContact() }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
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
