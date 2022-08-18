import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Icon from 'react-native-feather';

export default function ContactRow({ contact, setIsEdit, deleteContact }) {
    return (
        <View style={styles.update}>
            <Text style={styles.contact} >{contact.firstName} {contact.lastName}</Text>
            
            <View style={styles.controls}>
                <Pressable onPress={() => { setIsEdit(true) }}>
                    <Icon.Edit stroke="#4ba349" style={styles.icon} width={32} height={32} />
                </Pressable>

                <Pressable onPress={() => deleteContact(contact.userId)}>
                    <Icon.Trash2 stroke="#ca3d3a" style={styles.icon} width={32} height={32} />
                </Pressable>

                <Pressable onPress={() => { console.log("prolong deletion period") }}>
                    <Icon.Clock stroke="#3d94b9" style={styles.icon} width={32} height={32} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    update: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },

    contact: {
        fontSize: 17
    },

    controls: {
        flexDirection: "row",
        alignItems: "center"
    },

    icon: {
        marginRight: 7
    }
});
