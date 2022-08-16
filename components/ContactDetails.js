import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomizableButton from './CustomizableButton';

export default function ContactDetails({ contact, uid, setIsEdit }) {
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
                    action={() => { console.log("delete") }} />
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
    },

    deleteButton: {
        backgroundColor: "lightsalmon"
    },
});
