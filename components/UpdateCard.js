import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';

import ContactRow from './ContactRow';
import UpdateContact from './UpdateContact';

export default function UpdateCard({ contact, uid, updateContact, deleteContact }) {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <View key={uid} style={styles.container}>
            <ContactRow contact={contact} setIsEdit={setIsEdit} deleteContact={deleteContact} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isEdit}
                onRequestClose={() => setIsEdit(!isEdit)}>
                <View style={styles.modal}>
                    <UpdateContact contact={contact} setIsEdit={setIsEdit} update={updateContact} />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setIsEdit(!isEdit)}>
                        <Text style={styles.buttonCloseText}>Cancel</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: "#f3f3f3",
        margin: 2,
        padding: 10,
        borderRadius: 5
    },

    modal: {
        flex: 1,
        margin: "20%",
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        borderRadius: 20,
        padding: 20,
        elevation: 2,
    },

    buttonClose: {
        backgroundColor: "lightgray",
    },

    buttonCloseText: {
        color: "white",
        textTransform: "uppercase"
    }
});
