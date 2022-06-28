import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Switch } from 'react-native';

import * as Contacts from 'expo-contacts';

import CustomizableButton from '../components/CustomizableButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { DatabaseConnection } from '../database/database-connect';

// FIXME - TEMPORARY UNTIL NAVIGATION
import ViewContactsScreen from './ViewContactsScreen';

const db = DatabaseConnection.getConnection();

export default function AddContactScreen() {
    // FIXME - ONLY FOR TESTING PURPOSES, REFACTOR LATER
    useEffect(() => {
        DatabaseConnection.dropTableTestable(db);
        DatabaseConnection.createContactTable(db);
    }, []);

    /* const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [isTemporary, setIsTemporary] = useState(true); */

    const [firstName, setFirstName] = useState("Josipa");
    const [lastName, setLastName] = useState("Mrša");
    const [phoneNumber, setPhoneNumber] = useState("0915554444");
    const [location, setLocation] = useState("Split");
    const [description, setDescription] = useState("Temporary contact");
    const [isTemporary, setIsTemporary] = useState(true);

    const [fullContacts, setFullContacts] = useState([]);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [keepFor, setKeepFor] = useState("week");
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

        let res = DatabaseConnection.addContact(db, newContact);
        DatabaseConnection.viewContacts(db, setFullContacts);
        //console.log(fullContacts[0].first_name);
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

            <View>
                {fullContacts.map((fc, i) => {
                    return (
                        <Text key={i}>{fc.firstName} {fc.lastName}</Text>
                    )
                })}
            </View>
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
