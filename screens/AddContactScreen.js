import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Switch,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import CustomizableButton from '../components/CustomizableButton';

import { DatabaseConnection } from '../database/database-connect';
import useNotifications from '../hooks/useNotifications';
import { checkIfEmptyFields } from '../utils/Helpers';


const db = DatabaseConnection.getConnection();

export default function AddContactScreen({ navigation }) {
    /*const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [isTemporary, setIsTemporary] = useState(true);
    const [keepFor, setKeepFor] = useState("");
    */

    const [firstName, setFirstName] = useState("Josipa");
    const [lastName, setLastName] = useState("Mrša");
    const [phoneNumber, setPhoneNumber] = useState("0987654321");
    const [location, setLocation] = useState("Split");
    const [description, setDescription] = useState("Temporary contact");
    const [isTemporary, setIsTemporary] = useState(true);
    const [keepFor, setKeepFor] = useState(7);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [keepItemValues, setKeepItemValues] = useState([
        { label: 'One day', value: 1 },
        { label: 'One week', value: 7 },
        { label: 'One month', value: 30 }
    ]);

    const {
        sendPushNotification,
        expoPushToken,
        showToast
    } = useNotifications();

    useEffect(() => {
        const refreshData = navigation.addListener('focus', () => {
            // FIXME - ONLY FOR TESTING PURPOSES, REFACTOR LATER
            DatabaseConnection.dropTableTestable(db);
            DatabaseConnection.createContactTable(db);
        });

        return refreshData;
    }, [navigation]);


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


    const saveContact = () => {
        let isContactDataFilled = checkIfEmptyFields(
            [
                firstName,
                lastName,
                phoneNumber,
                location,
                description
            ]);

        let isTemporarySet = isTemporary && keepFor === "";

        if (!isContactDataFilled) {
            showToast("Fill out all fields!", 0.3);
            return;
        }

        if (isTemporarySet) {
            showToast("Please select the period in which you wish to keep your temporary contact!", 1.8);
            return;
        }

        let newContact = {
            firstName,
            lastName,
            phoneNumber,
            location,
            description,
            isTemporary,
            keepFor,
        }

        console.log(newContact);

        DatabaseConnection.addContact(db, newContact).then(res => {
            showToast("Contact added!", 2.6);
            //sendPushNotification(expoPushToken, "Contact added!");
            clearFields();
        }).catch((err) => {
            // TODO - err handler on database controller
            showToast(err.message, 2.6);
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                    description={"Save contact"}
                    action={() => { saveContact() }} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        margin: '5%',
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
