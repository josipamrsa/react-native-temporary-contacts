import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import ContactDetails from './ContactDetails';
import UpdateContact from './UpdateContact';

export default function UpdateCard({ contact, uid, updateContact, deleteContact }) {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <View key={uid} style={styles.container}>
            <ContactDetails contact={contact} setIsEdit={setIsEdit} deleteContact={deleteContact} />
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
        /* flex: 1, */
        /* width: "100%" */
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
