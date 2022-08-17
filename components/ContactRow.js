import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomizableButton from './CustomizableButton';

export default function ContactRow({ contact, setIsEdit, deleteContact }) {
    return (
        <View style={styles.update}>
            <Text style={styles.contact} >{contact.firstName} {contact.lastName}</Text>
            <View style={styles.controls}>
                <CustomizableButton
                    button={styles.editButton}
                    description={"Edit"}
                    action={() => { setIsEdit(true) }} />

                <CustomizableButton
                    button={styles.deleteButton}
                    description={"Delete"}
                    action={() => deleteContact(contact.userId)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    update: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },

    contact: {
        fontSize: 17
    },

    controls: {
        flexDirection: "row",
    },

    editButton: {
        backgroundColor: "lightgreen",
        marginRight: 4
    },

    deleteButton: {
        backgroundColor: "lightsalmon"
    },
});
